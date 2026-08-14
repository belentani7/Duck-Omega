import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import PublicCatalog from "@/pages/PublicCatalog";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Tools from "./pages/Tools";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Mission} />
      <Route path="/hub" component={Home} />
      <Route path="/catalog" component={PublicCatalog} />
      <Route path="/ferramentas" component={Tools} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
