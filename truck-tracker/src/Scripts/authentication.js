import qs from 'qs';

const WEB_API = 'http://localhost/FAMO.WebAPI/';

export default class Authentication {
    token = { a: 1 };
    user = { d: 2 };

    // static signIn = (grant_type, username, password) => {
    //     fetch(WEB_API + 'token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Accept': '*/*'
    //         },
    //         body: qs.stringify({
    //             grant_type: grant_type,
    //             username: username,
    //             password: password
    //         })
    //     }).then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         }

    //         console.log('av');
    //     }).then(data => {
    //         console.log('a');
    //         console.log(data);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }
}

//VER: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Usando_promises
//VER: https://www.valentinog.com/blog/redux/