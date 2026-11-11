export const hostapp = 'https://registro-casilla.sbn.gob.pe';

export const environment = {
	production: true,
	cryptKey: 'sV2zUWiuNo@3uv8nu9ir4',
	rutas: {
		landing: `${hostapp}`,
		servicios: {
			msDenunciasMUPE: 'http://api.denunciasmupe.com',
			casillaUrl: 'https://casilla.sbn.gob.pe'
		}
	},
	featureFlagNotaPago: true
};
