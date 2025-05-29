import { AppSidebar } from '@/components/app-sidebar';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Page() {
  return (
    <>
      <section>
        <h2>Welcome to TeachTeach</h2>
        <p>TeachTeach is a platform that helps you teach your students.</p>
      </section>
      {/* Recent Meetings Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Meetings</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Meeting Tile 1 */}
          <Card className="@container/card">
            <CardHeader>
              <CardTitle>Weekly Team Sync</CardTitle>
              <CardDescription>Today at 2:00 PM</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">4 participants</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">30 minutes</p>
              <button className="text-primary text-sm font-medium">Join</button>
            </CardFooter>
          </Card>

          {/* Meeting Tile 2 */}
          <Card className="@container/card">
            <CardHeader>
              <CardTitle>Project Review</CardTitle>
              <CardDescription>Yesterday at 10:00 AM</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">6 participants</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">45 minutes</p>
              <button className="text-primary text-sm font-medium">Replay</button>
            </CardFooter>
          </Card>

          {/* Meeting Tile 3 */}
          <Card className="@container/card">
            <CardHeader>
              <CardTitle>Client Presentation</CardTitle>
              <CardDescription>April 15, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">8 participants</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">60 minutes</p>
              <button className="text-primary text-sm font-medium">Replay</button>
            </CardFooter>
          </Card>

          {/* Meeting Tile 4 */}
          <Card className="@container/card">
            <CardHeader>
              <CardTitle>Design Workshop</CardTitle>
              <CardDescription>April 12, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">5 participants</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">90 minutes</p>
              <button className="text-primary text-sm font-medium">Replay</button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Resources Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Resources</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* Resource Tile 1 */}
          <Card className="@container/card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Meeting Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Quick start guides and templates for common meeting types
              </p>
            </CardContent>
            <CardFooter>
              <button className="text-primary text-sm font-medium">View</button>
            </CardFooter>
          </Card>

          {/* Resource Tile 2 */}
          <Card className="@container/card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Productivity Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Integrate with your favorite productivity apps
              </p>
            </CardContent>
            <CardFooter>
              <button className="text-primary text-sm font-medium">Browse</button>
            </CardFooter>
          </Card>

          {/* Resource Tile 3 */}
          <Card className="@container/card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn how to use advanced meeting features
              </p>
            </CardContent>
            <CardFooter>
              <button className="text-primary text-sm font-medium">Watch</button>
            </CardFooter>
          </Card>

          {/* Resource Tile 4 */}
          <Card className="@container/card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect with your favorite tools and services
              </p>
            </CardContent>
            <CardFooter>
              <button className="text-primary text-sm font-medium">Connect</button>
            </CardFooter>
          </Card>

          {/* Resource Tile 5 */}
          <Card className="@container/card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">API Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build custom integrations with our API
              </p>
            </CardContent>
            <CardFooter>
              <button className="text-primary text-sm font-medium">Explore</button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
