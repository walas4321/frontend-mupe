export const hostapp = 'https://registro-casilla.sbn.gob.pe';

export const environment = {
	production: true,
	cryptKey: 'sV2zUWiuNo@3uv8nu9ir4',
	rutas: {
		landing: `${hostapp}`,
		servicios: {
			msDenunciasMUPE: 'https://api-mupe-dphteebndha0f8hc.westus3-01.azurewebsites.net',
			casillaUrl: 'https://casilla.sbn.gob.pe'
		}
	},
	featureFlagNotaPago: true
};
