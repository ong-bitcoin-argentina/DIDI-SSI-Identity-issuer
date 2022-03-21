const personalData = new Map();
personalData.set('Credencial', 'Datos Personales');
personalData.set('Nombre(s)', 'Cosme');
personalData.set('Apellido(s)', 'Fulanito');
personalData.set('Nacionalidad', 'Argentina');
personalData.set('Numero de Identidad', '123456789');

const extraElement = new Map();
extraElement.set('Extra Element', 'extra');

const missingElement = new Map();

module.exports = {
  personalData,
  extraElement,
  missingElement,
  did: 'did:ethr:0xf7e86a76695493d49ac7ea776bb45ce6bee57b25',
  personalTemplateId: '62262ce12248912bdc580a36',
  invalidTemplateId: '00',
  locationTemplateId: '6226536d2248912bdc580a37',
};
