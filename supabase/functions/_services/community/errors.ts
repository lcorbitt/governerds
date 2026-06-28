export class CommunityValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CommunityValidationError";
  }
}

export class CommunityConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CommunityConflictError";
  }
}

export class CommunityNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CommunityNotFoundError";
  }
}

export class InviteExpiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InviteExpiredError";
  }
}

export class InviteEmailMismatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InviteEmailMismatchError";
  }
}
