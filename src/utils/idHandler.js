const OSIS_LENGTH = 9;
const UUID_LENGTH = 13;

function isValid(id) {
  return id.length == OSIS_LENGTH || id.length == UUID_LENGTH;
}

function getOsis(id) {
  if (id.length == UUID_LENGTH) {
    // TODO: convert uuid to osis
  }

  return id;
}

module.exports = { isValid, getOsis };
