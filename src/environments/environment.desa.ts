export const hostapp = 'http://192.168.5.98:8087';

export const environment = {
	production: true,
	cryptKey: 'sV2zUWiuNo@3uv8nu9ir4',
	rutas: {
		landing: `${hostapp}`,
		servicios: {
			msDenunciasMUPE: 'http://api.denunciasmupe.com',
			casillaUrl: 'http://localhost:4201/'
		}
	},
	featureFlagNotaPago: true
};
