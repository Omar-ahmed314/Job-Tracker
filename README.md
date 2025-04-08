## functional requirements

- types

```ts
  type job: {
    id: number,
    jobTitle: string,
    company: string,
    status: "InProgress" | "Rejected" | "Assessment" | "PhoneCall" | "meeting" | "JobOffer",
    applyDate: Date,
    jobURL: string,
    details: string
  }
```

## CRUD Operations

- ~~insert new job~~
- modify job
  - modify status
- delete job

### Read

- ~~All jobs~~
- ~~Show job:~~
  - by id
- ~~Filter Jobs by:~~
  - status
  - date -> applied from and to
