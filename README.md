# Ouber Eats

The Backend of Ouber Eats Clone

## 목차

0. [Project List](#0-Project-List)
1. [Start Project](#1-Start-Project)
2. [GraphQL API](#2-GraphQL-API)
3. [Database Configuration](#3-Database-Configuration)
4. [TypeORM and NEST](#4-TypeORM-and-NEST)
5. [User CRUD](#5-User-CRUD)
6. [User Authentication](#6-User-Authentication)
7. [Email Verification](#7-Email-Verification)

---

## 0. Project List

#### User Entity :

- id
- createdAt
- updatedAt

- email
- password
- role(client | owner | delivery)

#### User CRUD :

- Create Account
- Log In
- See Profile
- Edit Progile
- Verify Email

---

## 1. Start Project!

- #### 1.1 Backend Setup

  - ```
      nest g application
    ```

- #### 1.2 학습 방향
  - GraphQL이 NestJS에서 어떻게 동작하는지 익숙해지기
  - 데이터베이스 추가
  - 클론 코딩

---

## 2. GraphQL API

- [Github URL - GraphQL API](https://github.com/ohbyeongmin/ouber-eats-backend/commit/75f7ac7b52bb9e040e2b7655cb34aadfa27640b0)

- #### 2.1 Apollo Server Setup

  - [NestJS 홈페이지](https://docs.nestjs.com/graphql/quick-start)에 가면 GraphQL을 사용하기 위해 필요한 모듈을 알려줌
  - main.ts : 우리의 Application을 실행 하는 곳
  - App Module은 main.ts 로 import 되는 유일한 모듈이다
  - GraphQLModule을 App Module에 추가 해준다.
  - GraphQLModule.forRoot() : GraphQL의 root 모듈

  ```typescript
    @Module({
        imports: [
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        ],
        controllers: [],
        providers: [],
    })
  ```

- #### 2.2 First Resolver

  - NestJS의 GraphQL은 Apollo Server 를 기반으로 동작 한다
    -> Apollo Server 에게 우리가 원하는 세팅을 보낼 수 있다.
  - **typeDefs** : Document 혹은 서버에 schema 를 표현
  - **resolvers** : function 인데 Query를 처리하고, Mutation 를 한다.
  - 공식 문서에 나오는 [Code First](https://docs.nestjs.com/graphql/quick-start#code-first)(자동으로 스키마를 생성해줌) 방법으로 진행
  - ```javascript
    GraphQLModule.forRoot({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ```
  - Module 하나를 만든 뒤 resolver 파일을 만든다.
  - Module providers 에 resolver를 등록 한다.
  - schema가 자동으로 생성
  - ```javascript
    @Resolver() : Resolver 데코레이션을 사용하여 Resolver를 만들 수 있다.
    @Query(typeFunc: ReturnTypeFunc) : 쿼리를 만드는 데코레이션.
    @Mutation(typeFunc: ReturnTypeFunc) : Mutationa을 만드는 데코레이션.
    ```
  - autoScemaFile: true 로 하면 파일을 안만들고 메모리에 저장
  - serverURL/graphql 에 접속하면 플레이 그라운드 실행

- #### 2.3 Object Type

  - entity 를 생성
  - ```javascript
    @ObjectType()
    @Field(returnTypeFunction?: ReturnTypeFunc)
    ```
    이 두 데코레이션을 사용하여 object type 을 만들 수 있다.

- #### 2.4 Arguments

  - **NestJS는 필요한게 있으면 요청 해야함!**
  - ```javascript
    @Args() : NestJS에게 Argument 를 요청
    ```

- #### 2.5 InputTypes and ArgumentTypes

  - ```javascript
    @InputType() : object를 통째로 전달 할 수 있게 해줌
    @ArgsType() : 분리된 값들을 GraphQL argument로 전달해 줄 수 있도록 함
    ```

- #### 2.6 Validating ArgsTypes

  - class-calidator, class-transformer 설치
  - dto에 value 설정 ex) @IsString
  - app에 pipe 설정 : app.useGlobalPipes(new ValidationPipe())

- #### Summary

  - NestJS에서 GraphQL은 @nestjs/graphql 패키지를 사용하고 apollo-server 기반으로 돌아간다.
  - schema 는 resolver를 작성하면 자동으로 생성을 해준다.
  - 기존에 GraphQL 구조를 사용하며 decor 를 사용해 더 간편해졌다.

---

## 3. Database Configuration

- [Github URL - Database Configuration](https://github.com/ohbyeongmin/ouber-eats-backend/commit/611bf00b468a920932881d58b6192439da45fa93)

---

## 4. TypeORM and NEST

- [Github URL - TypeORM and NEST](https://github.com/ohbyeongmin/ouber-eats-backend/commit/8689eb612a1cd8065198a5e4e9adec63ba9bc495)

## 5. User CRUD

- [Github URL - User CRUD](https://github.com/ohbyeongmin/ouber-eats-backend/commit/0c5258b1fc8b54c3160935207b10ee03f682cfbd)

## 6. User Authentication

- [Github URL - User Authentication](https://github.com/ohbyeongmin/ouber-eats-backend/commit/9c5d9968d0ffccb6f468c6e849a783e1df682f31)

- 우선 header 에 token을 보낸다.
- header는 http 기술에 쓰이는 것이다.
- http 기술을 쓰기 위해서 middleware를 만들었다.
- 이 middleware는 header를 가져다가 우리가 만든 jwtService.verify()를 사용한다.
- 여기서 id 를 찾게 되면 우리가 만든 userService 를 사용해 해당 id를 가진 user를 찾는다.
- userService는 typeORM의 findOne 함수를 쓰는 findById function을 가지고 있다.
- 그리고 db에서 user를 찾으면 그 user를 request object에 붙여서 보낸닫.
- 그렇게 끝나 middleware를 가장 먼저 만나기 때문에 middleware가 원하는 대로 request object를 바꿀 수 있다.
- 그러면 middleware에 의해 바뀐 request object를 모든 resolver에서 쓸 수 있다.
- 만약 token이 없거나 에러가 있다면 아니면 token으로 user를 찾을 수 없다면 request에 어떤 것도 붙이지 않는다.
- 그래서 말도 안되는 token을 보낸다면 middleware가 아무 일도 안하고 에러만 출력 할것이다.
- 여기까지가 첫번째
- 두번째
- app.module에서 context를 보면 apollo server의 context나 graphql의 context는 모든 resolver에 정보를 보낼 수 있는 property다.
- context get이 매 request마다 호출될거다 context에서 function을 만들면 그 function이 request object를 줄것이다.
- request objects는 우리가 전에 만들어 본 user key를 가진 http에 해당된다.
- 먼저 JwtMiddleware를 거치고 graphql context에 request user를 보내는 것이다.
- 이제 request user라 하지 않고 context user라고 하자.
- 이제 users resolver를 보면 guard가 있다.
- guard는 function의 기능을 보충해준다.
- 그러면 이 function은 ture나 false를 return 해야한다.
- function 이름은 canActivate이다.
- ture를 리턴하면 request를 진행시키고
- false를 리턴하면 request 를 중지시킨다.
- 그리고 여기 있는 context는 nestjs의 ExecutionContext다
- 이 ExecutionContext를 가져다가 GqlExecutionContext로 바꿔야 한다.
- graphql의 getContext가 있는데 이건 grapqhql context가 여기 있는 context와 같다는 걸 말한다.
- middleware에서 시;작해서 apollo server의 context를 거치고 authorization guard를 거쳐서 마지막으로 resolver에 도착하면 우리가 만든 decorator가 있다.
- 이 decorator는 context를 가져다가 graphql context를 가져온다

- header에 token을 보내는걸로 시작해서 token을 decrypt, verify 하는 middleware를 거쳐
- request object에 user를 추가한다.
- 그리고 request object가 graphql context 안으로 들어가게 되고
- guard가 graphql context를 찾아 user가 있는지 없는지에 따라 true, false 를 return 한다.
- guard에 의해 request 가 authorize되면 resolver 에 decorator가 graphql context에서 찾은 user와 같은 user를 찾는다.
- 같은 graphql context의 user를 찾고 return 해준다.

- update 할 때 생긴 문제 1 : destructuring syntax 로 사용한 object
- 만약 user가 email만 보내거나 password만 보낼 경우 update() 가 undefined 데이터를 전송해서
  db에 undefined 값을 보내려 한다.
- update 할 때 생긴 문제 1 해결 : destructuring 을 사용 안하고 spread를 사용해서 update를 호출 했다.

- update 할 때 생긴 문제 2 : typeorm 에서 제공하는 update() 메소드가 update query 만 실행해서 패스워드에 해쉬 값이 안들어간다.
- @BeforeUpdate() hook 이 먹히지 않는다.
- 해결 : user를 찾고 수정한 뒤 save() 메소드를 사용 했다.
- save() 메소드는 데이터가 존재 할 경우 업데이트 해주고 존재 안하면 생성 후 추가 해준다.

---

## 7. Email Verification

- verification entity 를 만들어 준다.
- verification entity 는 User entity 와 One-to-One 관계다.
- verification entity 에 JoinColumn 을 설정 해줘서 verification entity에서 접근 가능하게 한다.
