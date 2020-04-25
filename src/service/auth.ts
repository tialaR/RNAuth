interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'qweiuioqewqeiwqioe2434234owqihewiqeh',
        user: {
          name: 'Dexter',
          email: 'dexter@contato.com',
        },
      });
    }, 2000);
  });
}
