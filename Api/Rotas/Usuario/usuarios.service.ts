import {config} from '../../config';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
import {Mongo} from '../../MongoDB/Mongo';
import {Collections} from '../../MongoDB/MongoCollections';


export module service {
   

    export async function authenticate(cliente : Collections.Cliente) {
        console.log('query:',{Email: cliente.Email});
        
        return await Mongo.BuscarUm(Collections.Cliente.NomeID, {Email: cliente.Email}).then((user: any) => {
            
            console.log('user:', user);
            
            if (user && bcrypt.compareSync(cliente.Senha, user.Senha)) {
                const token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '7d' });
                console.log("login com sucesso. token gerado", {...user,token});
                
                cliente.token = token;
                update(cliente._id,cliente);
                
                return {
                    ...user,
                    token
                };
            }
            if (!user) return {erro:'E-mail ou senha incorretos'};

        });
    }

    export async function create(NovoCliente : Collections.Cliente) {
        // validate
        if (await Mongo.BuscarUm(Collections.Cliente.NomeID, {Email: NovoCliente.Email})) {
            return {erro:'E-mail "' + NovoCliente.Email + '" já está sendo usado!'};
        }

        // hash password
        if (NovoCliente.Senha) {
            NovoCliente.Senha = bcrypt.hashSync(NovoCliente.Senha, 10);
        }
        if(NovoCliente.Email && NovoCliente.Senha){
            // save user
            NovoCliente.DataCriacao = new Date();
            await Mongo.Insert(Collections.Cliente.NomeID, NovoCliente);

            const token = jwt.sign({ sub: NovoCliente._id }, config.secret, { expiresIn: '7d' });
            console.log("usuário cadastrado com sucesso. token gerado", {...NovoCliente,token});
            
            NovoCliente.token = token;
            update(NovoCliente._id,NovoCliente);
            const msg = {
                to: NovoCliente.Email,
                from: 'suporte@elshaddaymarmitex.com',
                subject: 'Registro no ElShadday Marmitex',
                text: 'Você se cadastrou no nosso serviço de entrega, acesse ao site para conferir as suas opções.',
                html: '<strong><a href="https://elshadday-angular.herokuapp.com">ElShadday</a></strong>',
            };
            console.log(msg);
            sgMail.send(msg)
            return {
                ...NovoCliente,
                token
            };
        }else{
            console.log("usuário não cadastrado");
            return {erro:'usuário não cadastrado'};
        }
    }

    export async function getById(id:string) {
        return await Mongo.BuscarUm(Collections.Cliente.NomeID, {_id: id}) as Collections.Cliente;
    }

    export async function update(id:string, cliente : Collections.Cliente) {
        const user = await getById(id);

        // validate
        if (!user) return {erro:'Usuário não encontrado'};
        if (user.Email !== cliente.Email && await Mongo.BuscarUm(Collections.Cliente.NomeID, { username: cliente.Email }) as Collections.Cliente) {
            return {erro:'E-mail "' + cliente.Email + '" já está sendo usado'};
        }

        // hash password if it was entered
        if (cliente.Senha) {
            cliente.Senha = bcrypt.hashSync(cliente.Senha, 10);
        }

        // copy userParam properties to user
        Object.assign(user, cliente);

        await Mongo.Edit(Collections.Cliente.NomeID, cliente._id, cliente);
    }

    export async function _delete(id: string) {
        await Mongo.Remove(Collections.Cliente.NomeID, {_id : id});
    }

    // helper functions

    export function omitPassword(cliente: Collections.Cliente) {
        const { Senha, ...userWithoutPassword } = cliente;
        return userWithoutPassword;
    }


};