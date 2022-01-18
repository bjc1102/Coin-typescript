// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {

  //styled-components의 테마 정의를 확장하는 것
  //DefaultTheme으로 export
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor:string;
    neonColor:string;
  }
}