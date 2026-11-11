export const hostapp = 'http://localhost:4204';

export const environment = {
	production: false,
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
