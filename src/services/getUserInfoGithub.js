import appConfig from '../utils/constants.json';

const GetUserInfoGithub = async (username, success, setErrosMesages)=>{
    return await fetch(`${appConfig.GITHUB_API}${username}`, {
      method: 'GET'
    }).then(async (result)=>{
      if (result.status === 200){
        let dados = await result.json()
        success(dados)
        setErrosMesages([])
       }
       else if (result.status === 403){
        setErrosMesages(['Excedeu o limite de requisição para o github API.'])
       }
       else{
        setErrosMesages(['Erro ao buscar usuario no github'])
       }
       
    })
  }

export default GetUserInfoGithub