# OOP Server Admin

```bash
workspace
   ├── admin
   ├── server
   └── web
```

## 정리

- controller -> service
  - dto를 받아서 entity로 변환한 후 service로 전달.
  - 에러 처리는 controller에서 한다.
- service -> repository
  - entity를 받아서 repository로 전달.
  - 비즈니스 로직은 service에서 한다.
- repository -> service
  - DB관련 로직은 repository에서 한다.
  - repository는 entity를 반환한다.
- service -> controller
  - service에서 entity를 dto로 변환한 후 controller로 전달.
