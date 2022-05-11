const ID_LENGTH = 9;
const UUID_LENGTH = 13;

const ID = 0;
const UUID = 1;

function isValid(id) {
  return id.length == ID_LENGTH || id.length == UUID_LENGTH;
}

function returnType(id) {
  if (id.length == ID_LENGTH) {
    return ID;
  }
  if (id.length == UUID) {
    return UUID;
  }
  return null;
}

class Student {
    constructor(name, id, uuid){
        this.name = name;
        this.id = id;
        this.uuid = uuid;
    }
}
