export default {
  HOST: 'http://127.0.0.1', // dev
  PORT: '3000', // dev
  SECRET: 'asdasf;qqwrlmsdfmafk;rqwelqkrjlsdffsdfdsjhfksrweriuosfpyuirewbfmsdfbmsdfiwher;dsf;rerkhjgkertkr',
  JWT_EXPIRED: 604800,
  DAILY_EXPIRED: 86400,
  SERVER_LINK: '',
  email: {
    USE_EMAIL_TESTER: 'yes', //dev
    EMAIL_TO_TESTER: 'arsyiazimin@gmail.com'
  },
  db: {
    DB_TYPE: 'mysql',
    DB_HOST: '5.181.216.118',
    DB_PORT: 3306,
    DB_USER_NAME: 'u1113286_root',
    DB_PASSWORD: 'sikadasuperuser',
    DB_NAME: 'u1113286_sikada',
    DB_SYNCHRONIZE: false,
    DB_LOGGING: true
  },
  microservices: {
    TYPE: 'redis',
    HOST: '192.168.56.101',
    PORT: 6379,
    DURATION: 60000
  }
};
