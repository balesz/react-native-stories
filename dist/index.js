export * from "./App";
export function storiesOf(kind, module) {
    return new StoryBuilder(kind);
}
export class StoryBuilder {
    constructor(kind) {
        this.kind = kind;
        this.stories = [];
        StoryBuilder.stories.push(this);
    }
    add(name, story) {
        this.stories.push({ name, story });
        return this;
    }
    addDecorator(decorator) {
        this.decorator = decorator;
        return this;
    }
}
StoryBuilder.stories = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxPQUFPLENBQUE7QUFLckIsTUFBTSxVQUFVLFNBQVMsQ0FBQyxJQUFZLEVBQUUsTUFBVztJQUNqRCxPQUFPLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQy9CLENBQUM7QUFFRCxNQUFNLE9BQU8sWUFBWTtJQVF2QixZQUFZLElBQVk7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFDakIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBb0I7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQTtRQUNoQyxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFRCxZQUFZLENBQUMsU0FBNEI7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7UUFDMUIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDOztBQXBCTSxvQkFBTyxHQUFtQixFQUFFLENBQUEifQ==