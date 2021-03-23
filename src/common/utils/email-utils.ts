const EMAIL_REGULAR = /^((([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6};))*(([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})))$/;

export class EmailUtils {
  public static isEmail = (email: string) => {
    return EMAIL_REGULAR.test(email);
  }

  public static isEmails = (email: string) => {
    return EMAIL_REGULAR.test(email.replace(/\r+|\n+/g, ';'));
  }
}

