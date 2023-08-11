# OOP Server Admin

```bash
workspace
   ├── admin
   ├── server
   └── web
```

## 정리

### 아키텍처

- controller -> service
  - 에러 처리는 controller에서 한다.
- service -> repository
  - controller, service에서 dto를 entity로 변환한 후 repository로 전달.
  - 비즈니스 로직은 service에서 한다.
- repository -> service
  - DB관련 로직은 repository에서 한다.
  - repository는 entity를 반환한다.
- service -> controller
  - service에서 entity를 dto로 변환한 후 controller로 전달.

### 인증

- access-token은 jwt bearer token을 사용한다.
- refresh-token은 cookie를 사용한다.
