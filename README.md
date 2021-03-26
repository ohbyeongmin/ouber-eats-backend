# Ouber Eats

The Backend of Ouber Eats Clone

## 목차

1. [Start Project](#1-Start-Project)
2. [GraphQL API](#2-GraphQL-API)

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
