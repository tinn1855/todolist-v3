import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function DesignSystem() {
  return (
    <div className="container mx-auto px-10 py-5">
      <div className="w-1/2 flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <h1>Button:</h1>
          <Button>New Todo</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="outline">Edit Todo</Button>
        </div>
        <div className="flex gap-2 items-center">
          <h1>Badge:</h1>
          <Badge>Low</Badge>
          <Badge variant="outline">Medium</Badge>
          <Badge variant="destructive">High</Badge>
        </div>
        <div className="flex gap-2 items-center">
          <h1>Input:</h1>
          <Input />
        </div>
        <div className="flex gap-2 items-center">
          <h1>Avatar:</h1>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
