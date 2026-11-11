export const hostapp = 'http://localhost:4204';

export const environment = {
	production: false,
	cryptKey: '',
	rutas: {
		landing: `${hostapp}`,
		servicios: {
			msDenunciasMUPE: 'http://localhost:8190',
			casillaUrl: 'http://localhost:4201/'
		}
	},
	featureFlagNotaPago: true
};
