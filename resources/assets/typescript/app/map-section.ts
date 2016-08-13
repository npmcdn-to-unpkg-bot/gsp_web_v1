export class MapSection {
  id: number;
  polyline: string;
  main_parking_type_id: number;
  street_side: number;
  is_hours_restricted: number; // TODO:NW convert to boolean?
  main_short_term_min: number;
  notes: string;
}