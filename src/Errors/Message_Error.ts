export enum ErrorMessageServices {
  MessageErrorUpdateUser = 'No se puede actualizar este usuario por que no existe!',
  MessageErrorDelateUser = 'No se puede eliminar este usuario por que no existe!',
  MessageErrorUserExist = 'Este Correo ya existe!',
  MessageErrorUserNotFound = 'Este usuario no existe!',
  MessageErrorIncorrectPassword = 'Contraseña incorrecta!',
}

export enum ErrorMessageControllersUsers {
  MessageErrorGetAllUser = 'Error al obtener todos los usuarios!',
  MessageErrorGetOneUser = 'Error al obtener  usuario!',
  MessageErrorUpdateUser = 'Error al actualizar usuario!',
  MessageErrorDelateUser = 'Error al eliminar usuario!',
}

export enum ErrorMessageControllersAuth {
  MessageErrorSignupUser = 'Error al crear un nuevo usuario',
  MessageErrorLoginUser = 'Error al iniciar sesion',
  MessageErrorLogoutUser = 'Error al cerrar sesión!',
}
