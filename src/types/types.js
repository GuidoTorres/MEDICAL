const types = {
  authChecking: '[auth] Cheking login state',
  authCheckingFinish: '[auth] Finish ckeking login state',
  authStartLogin: '[auth] Start login',
  authLogin: '[auth] Login',
  authStartRegister: '[auth] Start register',
  authStartTokenRenew: '[auth] Start token renew',
  authLogout: '[auth] Logout',

  adminGetClinica: '[adminGetClinica] Listar clinica ',
  adminPostClinica: '[adminPostClinica] Agregar clinica ',
  adminPutClinica: '[adminPutClinica] Actualizar clinica ',

  agregarClinica: '[event] agregar nuevo',

  deleteClinica: '[deleteClinica] Eliminar',
  clearActiveEvent: '[Clear] Clear active event',
  eventoActivo: '[evento] Evento activo',
};

export { types };
