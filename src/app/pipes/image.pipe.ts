import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(url: string = ""): unknown {

    if (url) return url
    return "https://www.octavia.com.sv/static/not-available-f228fdd55ec7477271dee51823570651.png";
  }

}
