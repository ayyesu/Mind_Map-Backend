export interface Config {
    appUrl: string;
}

export interface EnvironmentConfig {
    development: Config;
    production: Config;
}
