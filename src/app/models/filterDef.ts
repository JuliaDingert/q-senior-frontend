﻿export interface FilterDef {
  label: string;
  type: string;
  placeholder?: string;
  jsonAttributeName?: string; //we need this to get the correct values for multiselect
}
