// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',

//   transform: {
//     '^.+\\.(ts|tsx)$': ['ts-jest', {
//       tsconfig: {
//         // preserve-ийг react-jsx болгож хүчээр өөрчилж байна
//         jsx: 'react-jsx',
//       },
//     }],
//   },

//   moduleNameMapper: {
//     // Чиний tsconfig дээр "@/*": ["./*"] гэж байгаа тул src-ийг хас
//     '^@/(.*)$': '<rootDir>/$1',
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   },

//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
// };

// export default config;


import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  transform: {
    // ts-jest ашиглан TypeScript болон JSX кодыг хөрвүүлэх
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },

  moduleNameMapper: {
    // 1. Чиний tsconfig-той тааруулсан зам (Alias)
    '^@/(.*)$': '<rootDir>/$1',
    
    // 2. CSS болон Зургийн файлуудыг тест ажиллах үед үл тоомсорлох (Mocking)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
      '<rootDir>/__mocks__/fileMock.js',
  },

  // ESM ашигладаг сангуудыг (жишээ нь: lucide-react) хөрвүүлэхэд хэрэгтэй
  transformIgnorePatterns: [
    '/node_modules/(?!(lucide-react|@radix-ui|@apollo\\/client)/)',
  ],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  // Тестийн явцын мэдээллийг тодорхой харах
  verbose: true,
};

export default config;