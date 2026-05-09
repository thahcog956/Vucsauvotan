export class DungeonGenerator {
  constructor(cols, rows, floor) {
    this.cols = cols; this.rows = rows; this.floor = floor;
    this.rooms = [];
  }
  generate() {
    const map = Array(this.rows).fill().map(() => Array(this.cols).fill(1)); // wall=1
    // Tạo phòng ngẫu nhiên
    let numRooms = 6 + Math.floor(this.floor * 1.2);
    for (let i=0; i<numRooms; i++) {
      let w = 5 + Math.floor(Math.random()*6);
      let h = 4 + Math.floor(Math.random()*5);
      let x = Math.floor(Math.random()*(this.cols-w-2))+1;
      let y = Math.floor(Math.random()*(this.rows-h-2))+1;
      // Carve room
      for (let r=y; r<y+h; r++) for (let c=x; c<x+w; c++) map[r][c] = 0; // floor
      this.rooms.push({x,y,w,h});
    }
    // Hành lang nối các phòng (đơn giản nối tâm)
    for (let i=0; i<this.rooms.length-1; i++) {
      let r1 = this.rooms[i], r2 = this.rooms[i+1];
      let cx1 = Math.floor(r1.x+r1.w/2), cy1 = Math.floor(r1.y+r1.h/2);
      let cx2 = Math.floor(r2.x+r2.w/2), cy2 = Math.floor(r2.y+r2.h/2);
      // Ngang trước dọc sau
      for (let x=Math.min(cx1,cx2); x<=Math.max(cx1,cx2); x++) map[cy1][x] = 0;
      for (let y=Math.min(cy1,cy2); y<=Math.max(cy1,cy2); y++) map[y][cx2] = 0;
    }
    // Đặt cầu thang ở phòng cuối
    let last = this.rooms[this.rooms.length-1];
    map[last.y+Math.floor(last.h/2)][last.x+Math.floor(last.w/2)] = 2;
    return map;
  }
}