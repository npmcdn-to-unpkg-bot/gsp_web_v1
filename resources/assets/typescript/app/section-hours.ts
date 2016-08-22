export class SectionHours
{
  start_time:string;
  end_time:string;
  selected:number;
  on_parking_type_id:number;
  on_pph:number;
  on_short_term_min:number;
  off_parking_type_id:number;
  off_pph:number;
  off_short_term_min:number;

  public static getTypes(){
    // note if has permit hours but all others allowed to park time limited,
    // main p type is free time limited, make note if have permit no retriction
    return [
      {value: '', label: 'none'},
      {value: 'slcMeters', label: 'SLC 8t8|S 2h|S NL'},
      {value: 'slc2hr' , label:  '8t6 All days'},
      {value: 'permit7t7' , label:  '7t7|S NL|Su NL'},
      {value: 'permit8t3' , label:  '8t3|S NL|Su NL'}
    ];
  }
}