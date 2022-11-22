export class TimerUtils {
  public static waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, time)
    })
  }
}
