import {EnvironmentConfig} from '../interface/config/config';

const config: EnvironmentConfig = {
    development: {
        appUrl: 'http://localhost:5173',
    },
    production: {
        appUrl: 'https://mindmap-di.netlify.app',
    },
};

const environment: string = process.env.NODE_ENV || 'development';

export default config[environment as keyof EnvironmentConfig];
