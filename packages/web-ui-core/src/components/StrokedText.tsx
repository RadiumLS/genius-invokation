// Copyright (C) 2025 Guyutongxue
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { splitProps, type ComponentProps, type JSX } from "solid-js";

export interface StrokedTextProps extends ComponentProps<"div"> {
  text: string;
  strokeWidth: number;
  strokeColor: string;
}

export function StrokedText(props: StrokedTextProps) {
  const [local, rest] = splitProps(props, [
    "text",
    "class",
    "strokeWidth",
    "strokeColor",
  ]);
  return (
    <div class={`grid grid-cols-1 grid-rows-1 ${local.class ?? ""}`} {...rest}>
      <div
        class="grid-area-[1/1] pointer-events-none select-none"
        style={{
          "-webkit-text-stroke-color": local.strokeColor,
          "-webkit-text-stroke-width": `${local.strokeWidth}px`,
        }}
      >
        {local.text}
      </div>
      <div class="grid-area-[1/1]">{local.text}</div>
    </div>
  );
}
