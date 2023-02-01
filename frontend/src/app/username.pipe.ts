import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  transform(value: unknown,): string {
    var today = new Date()
var curHr = today.getHours()

if (curHr < 12) {
  return 'Good Morning  '+value;
} else if (curHr < 18) {
  return 'Good Afternoon  '+value;
} else {
  return 'Good Evening  '+value;
}
  }

}
