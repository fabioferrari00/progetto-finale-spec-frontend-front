export type Course = {
  //obbligatorie
  title: string,
  category: string,

  typeOfCourse: string,
  description: string,
  duration: number,
  price: number,
  isAvailable: boolean,
  prefecture: string,
  typeOfExam: string,
  teachers: string[],

  readonly prefectureUrl: string,
}