import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input() question: string;
  @Input() answers: any[];
  @Input() questionIndex: number;

  @Output() answer = new EventEmitter();

  public answerControl: FormControl = new FormControl('', Validators.required);

  public sendAnswer(): void {
    this.answer.emit(this.answerControl.value);
  }
}
