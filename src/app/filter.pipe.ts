import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'searchFilter'})

export class FilterPipe implements PipeTransform {
    transform(items: any[], searchTag: string) {
        console.log(searchTag);
        if (!items) return [];
        if (searchTag.includes("home")) return items;
        return items.filter(it =>  {
            return it.data.tag[0].text.includes(searchTag);
        });
    }

}