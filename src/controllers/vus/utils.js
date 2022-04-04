const formatPeronalData = (data) => {
  const personalData = new Map();
  personalData.set('Credencial', 'Datos Personales');
  personalData.set('Nombre(s)', data.names);
  personalData.set('Apellido(s)', data.lastNames);
  personalData.set('Nacionalidad', data.nationality);
  personalData.set('Numero de Identidad', data.idNumber);

  return personalData;
};

const formatLocationData = (data) => {
  const locationData = new Map();
  locationData.set('Credencial', 'Domicilio Legal');
  locationData.set('Domicilio', data.address);
  locationData.set('Ciudad/Barrio', data.city);
  locationData.set('Departamento/Municipalidad', data.municipality);
  locationData.set('Provincia', data.province);
  locationData.set('País', data.country);

  return locationData;
};

module.exports = {
  formatLocationData,
  formatPeronalData,
};
