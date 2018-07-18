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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxPQUFPLENBQUE7QUFLckIsTUFBTSxvQkFBb0IsSUFBWSxFQUFFLE1BQVc7SUFDakQsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMvQixDQUFDO0FBRUQsTUFBTTtJQVFKLFlBQVksSUFBWTtRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNqQixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxLQUFvQjtRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO1FBQ2hDLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVELFlBQVksQ0FBQyxTQUE0QjtRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtRQUMxQixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7O0FBcEJNLG9CQUFPLEdBQW1CLEVBQUUsQ0FBQSJ9