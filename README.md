## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## 프로젝트 구조

ㄴsrc\n
    ㄴassets // 사용된 image\n
    ㄴcomponents\n 
        ㄴdropdown // currency, per page 등 선택 기능\n
        ㄴloading // api 로딩시 호출\n
        ㄴtoast // toast 지정\n
        ㄴpage\n
            ㄴcoinlist // 전체 코인, 북마크 코인 리스트\n 
            ㄴdetail // 코인 디테일 정보 불러오기\n
    ㄴinterface // coin 정보의 타입 지정\n
    ㄴstyle // styled component 저장 목적\n
    ㄴutils // 사용되는 함수들 저장 목적\n
## 사용한 라이브러리

### axios

api 호출과 에러 처리를 위해 사용

### styled components

css 라이브러리 사용

### styled-reset

css 초기화용
