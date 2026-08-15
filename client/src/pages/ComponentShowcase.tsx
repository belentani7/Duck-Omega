import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/contexts/ThemeContext";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  AlertCircle,
  CalendarIcon,
  Check,
  Clock,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast as sonnerToast } from "sonner";
import { AIChatBox, type Message } from "@/components/AIChatBox";

export default function ComponentShowcase() {
  const { theme, toggleTheme } = useTheme();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [datePickerDate, setDatePickerDate] = useState<Date>();
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const [progress, setProgress] = useState(33);
  const [currentPage, setCurrentPage] = useState(2);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [dialogInput, setDialogInput] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Caixa de chat com IA demo state
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: "system", content: "Você é um assistente útil." },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleDialogEnviar = () => {
    console.log("Diálogo enviado com valor:", dialogInput);
    sonnerToast.success("Enviado com sucesso", {
      description: `Entrada: ${dialogInput}`,
    });
    setDialogInput("");
    setDialogOpen(false);
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleDialogEnviar();
    }
  };

  const handleChatSend = (content: string) => {
    // Add user message
    const newMessages: Message[] = [...chatMessages, { role: "user", content }];
    setChatMessages(newMessages);

    // Simulate AI response with delay
    setIsChatLoading(true);
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: `Esta é uma **resposta de demonstração**. Em um app real, você chamaria uma mutação tRPC aqui:\n\n\`\`\`typescript\nconst chatMutation = trpc.ai.chat.useMutation({\n  onSuccess: (response) => {\n    setChatMessages(prev => [...prev, {\n      role: "assistant",\n      content: response.choices[0].message.content\n    }]);\n  }\n});\n\nchatMutation.mutate({ messages: newMessages });\n\`\`\`\n\nSua mensagem foi: "${content}"`,
      };
      setChatMessages([...newMessages, aiResponse]);
      setIsChatLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container max-w-6xl mx-auto">
        <div className="space-y-2 justify-between flex">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Biblioteca de componentes Shadcn/ui
          </h2>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="space-y-12">
          {/* Cores de texto Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Cores de texto</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Primeiro plano (padrão)
                      </p>
                      <p className="text-foreground text-lg">
                        Cor de texto padrão para o conteúdo principal
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Primeiro plano suave
                      </p>
                      <p className="text-muted-foreground text-lg">
                        Texto suave para informações secundárias
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Principal
                      </p>
                      <p className="text-primary text-lg font-medium">
                        Texto na cor principal da marca
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Primeiro plano secundário
                      </p>
                      <p className="text-secondary-foreground text-lg">
                        Cor de texto de ações secundárias
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Primeiro plano de destaque
                      </p>
                      <p className="text-accent-foreground text-lg">
                        Texto de destaque para ênfase
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Destrutivo
                      </p>
                      <p className="text-destructive text-lg font-medium">
                        Texto de ação destrutiva ou de erro
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Primeiro plano do cartão
                      </p>
                      <p className="text-card-foreground text-lg">
                        Cor de texto sobre fundos de cartões
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Primeiro plano do popover
                      </p>
                      <p className="text-popover-foreground text-lg">
                        Cor de texto nos popovers
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Combinações de cores Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Combinações de cores</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-primary text-primary-foreground rounded-lg p-4">
                    <p className="font-medium mb-1">Principal</p>
                    <p className="text-sm opacity-90">
                      Fundo principal com texto em primeiro plano
                    </p>
                  </div>
                  <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
                    <p className="font-medium mb-1">Secundário</p>
                    <p className="text-sm opacity-90">
                      Fundo secundário com texto em primeiro plano
                    </p>
                  </div>
                  <div className="bg-muted text-muted-foreground rounded-lg p-4">
                    <p className="font-medium mb-1">Suave</p>
                    <p className="text-sm opacity-90">
                      Fundo suave com texto em primeiro plano
                    </p>
                  </div>
                  <div className="bg-accent text-accent-foreground rounded-lg p-4">
                    <p className="font-medium mb-1">Destaque</p>
                    <p className="text-sm opacity-90">
                      Fundo de destaque com texto em primeiro plano
                    </p>
                  </div>
                  <div className="bg-destructive text-destructive-foreground rounded-lg p-4">
                    <p className="font-medium mb-1">Destrutivo</p>
                    <p className="text-sm opacity-90">
                      Fundo destrutivo com texto em primeiro plano
                    </p>
                  </div>
                  <div className="bg-card text-card-foreground rounded-lg p-4 border">
                    <p className="font-medium mb-1">Cartão</p>
                    <p className="text-sm opacity-90">
                      Fundo do cartão com texto em primeiro plano
                    </p>
                  </div>
                  <div className="bg-popover text-popover-foreground rounded-lg p-4 border">
                    <p className="font-medium mb-1">Janela flutuante</p>
                    <p className="text-sm opacity-90">
                      Fundo do popover com texto em primeiro plano
                    </p>
                  </div>
                  <div className="bg-background text-foreground rounded-lg p-4 border">
                    <p className="font-medium mb-1">Fundo</p>
                    <p className="text-sm opacity-90">
                      Fundo padrão com texto em primeiro plano
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Botões Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Botões</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <Button>Padrão</Button>
                  <Button variant="secondary">Secundário</Button>
                  <Button variant="destructive">Destrutivo</Button>
                  <Button variant="outline">Contorno</Button>
                  <Button variant="ghost">Fantasma</Button>
                  <Button variant="link">Link</Button>
                  <Button size="sm">Pequeno</Button>
                  <Button size="lg">Grande</Button>
                  <Button size="icon">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Campos de formulário Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Campos de formulário</h3>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="E-mail" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem aqui."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Seleção</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma fruta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Maçã</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Laranja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Aceite os termos e condições</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Modo avião</Label>
                </div>
                <div className="space-y-2">
                  <Label>Grupo de opções</Label>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Opção um</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Opção dois</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Controle deslizante</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <Label>Código OTP</Label>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="space-y-2">
                  <Label>Seletor de data e hora</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !datePickerDate && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {datePickerDate ? (
                          format(datePickerDate, "PPP HH:mm", { locale: zhCN })
                        ) : (
                          <span>Selecione data e hora</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="p-3 space-y-3">
                        <Calendar
                          mode="single"
                          selected={datePickerDate}
                          onSelect={setDatePickerDate}
                        />
                        <div className="border-t pt-3 space-y-2">
                          <Label className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Hora
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              type="time"
                              value={
                                datePickerDate
                                  ? format(datePickerDate, "HH:mm")
                                  : "00:00"
                              }
                              onChange={e => {
                                const [hours, minutes] =
                                  e.target.value.split(":");
                                const newDate = datePickerDate
                                  ? new Date(datePickerDate)
                                  : new Date();
                                newDate.setHours(parseInt(hours));
                                newDate.setMinutes(parseInt(minutes));
                                setDatePickerDate(newDate);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {datePickerDate && (
                    <p className="text-sm text-muted-foreground">
                      Selecionado:{" "}
                      {format(datePickerDate, "yyyy/MM/dd  HH:mm", {
                        locale: zhCN,
                      })}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Menu pesquisável</Label>
                  <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCombobox}
                        className="w-full justify-between"
                      >
                        {selectedFramework
                          ? [
                              { value: "react", label: "React" },
                              { value: "vue", label: "Vue" },
                              { value: "angular", label: "Angular" },
                              { value: "svelte", label: "Svelte" },
                              { value: "nextjs", label: "Next.js" },
                              { value: "nuxt", label: "Nuxt" },
                              { value: "remix", label: "Remix" },
                            ].find(fw => fw.value === selectedFramework)?.label
                          : "Selecione um framework..."}
                        <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Pesquisar frameworks..." />
                        <CommandList>
                          <CommandEmpty>Nenhum framework encontrado</CommandEmpty>
                          <CommandGroup>
                            {[
                              { value: "react", label: "React" },
                              { value: "vue", label: "Vue" },
                              { value: "angular", label: "Angular" },
                              { value: "svelte", label: "Svelte" },
                              { value: "nextjs", label: "Next.js" },
                              { value: "nuxt", label: "Nuxt" },
                              { value: "remix", label: "Remix" },
                            ].map(framework => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={currentValue => {
                                  setSelectedFramework(
                                    currentValue === selectedFramework
                                      ? ""
                                      : currentValue
                                  );
                                  setOpenCombobox(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    selectedFramework === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {framework.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {selectedFramework && (
                    <p className="text-sm text-muted-foreground">
                      Selecionado:{" "}
                      {
                        [
                          { value: "react", label: "React" },
                          { value: "vue", label: "Vue" },
                          { value: "angular", label: "Angular" },
                          { value: "svelte", label: "Svelte" },
                          { value: "nextjs", label: "Next.js" },
                          { value: "nuxt", label: "Nuxt" },
                          { value: "remix", label: "Remix" },
                        ].find(fw => fw.value === selectedFramework)?.label
                      }
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="month" className="text-sm font-medium">
                        Mês
                      </Label>
                      <Select
                        value={selectedMonth}
                        onValueChange={setSelectedMonth}
                      >
                        <SelectTrigger id="month">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            month => (
                              <SelectItem
                                key={month}
                                value={month.toString().padStart(2, "0")}
                              >
                                {month.toString().padStart(2, "0")}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-sm font-medium">
                        Ano
                      </Label>
                      <Select
                        value={selectedYear}
                        onValueChange={setSelectedYear}
                      >
                        <SelectTrigger id="year">
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 10 },
                            (_, i) => new Date().getFullYear() - 5 + i
                          ).map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {selectedMonth && selectedYear && (
                    <p className="text-sm text-muted-foreground">
                      Selecionado: {selectedYear}/{selectedMonth}/
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Exibição de dados Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Exibição de dados</h3>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label>Distintivos</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Padrão</Badge>
                    <Badge variant="secondary">Secundário</Badge>
                    <Badge variant="destructive">Destrutivo</Badge>
                    <Badge variant="outline">Contorno</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Avatar</Label>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Progresso</Label>
                  <Progress value={progress} />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                    >
                      -10
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                      +10
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Esqueleto</Label>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Paginação</Label>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            setCurrentPage(Math.max(1, currentPage - 1));
                          }}
                        />
                      </PaginationItem>
                      {[1, 2, 3, 4, 5].map(page => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={e => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            setCurrentPage(Math.min(5, currentPage + 1));
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                  <p className="text-sm text-muted-foreground text-center">
                    Current page: {currentPage}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Alternador</Label>
                  <Table>
                    <TableCaption>Uma lista das suas faturas recentes.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Fatura</TableHead>
                        <TableHead>Situação</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Pago</TableCell>
                        <TableCell>Cartão de crédito</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV002</TableCell>
                        <TableCell>Pendente</TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV003</TableCell>
                        <TableCell>Não pago</TableCell>
                        <TableCell>Transferência bancária</TableCell>
                        <TableCell className="text-right">$350.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Barra de menus</Label>
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>Arquivo</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Nova aba</MenubarItem>
                        <MenubarItem>Nova janela</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Compartilhar</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Imprimir</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Editar</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Desfazer</MenubarItem>
                        <MenubarItem>Refazer</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Exibir</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Recarregar</MenubarItem>
                        <MenubarItem>Forçar recarga</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Migalhas de navegação</Label>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Início</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/components">
                          Componentes
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Migalhas de navegação</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Alertas Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Alertas</h3>
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Atenção!</AlertTitle>
                <AlertDescription>
                  Você pode adicionar componentes ao seu app usando a CLI.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                  Sua sessão expirou. Entre novamente.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Abas Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Abas</h3>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Conta</TabsTrigger>
                <TabsTrigger value="password">Senha</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Conta</CardTitle>
                    <CardDescription>
                      Faça alterações na sua conta aqui.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" defaultValue="Pedro Duarte" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Salvar alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Senha</CardTitle>
                    <CardDescription>
                      Altere sua senha aqui.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Senha atual</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">Nova senha</Label>
                      <Input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Salvar senha</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações</CardTitle>
                    <CardDescription>
                      Gerencie suas configurações aqui.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      O conteúdo das configurações aparece aqui.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Acordeão Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Acordeão</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>É acessível?</AccordionTrigger>
                <AccordionContent>
                  Sim. Ele segue o padrão de design WAI-ARIA.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Tem estilo aplicado?</AccordionTrigger>
                <AccordionContent>
                  Sim. Ele vem com estilos padrão que combinam com a estética dos outros
                  componentes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Tem animação?</AccordionTrigger>
                <AccordionContent>
                  Sim. Ele é animado por padrão, mas você pode desativá-lo se
                  preferir.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Recolhível Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Recolhível</h3>
            <Collapsible>
              <Card>
                <CardHeader>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <CardTitle>@peduarte marcou 3 repositórios como favoritos</CardTitle>
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/primitives
                      </div>
                      <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/colors
                      </div>
                      <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @stitches/react
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </section>

          {/* Dialog, Sheet, Drawer Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Sobreposições</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Abrir diálogo</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Testar entrada</DialogTitle>
                        <DialogDescription>
                          Digite um texto abaixo. Pressione Enter para enviar (composição IME compatível).
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="dialog-input">Entrada</Label>
                          <Input
                            id="dialog-input"
                            placeholder="Digite algo..."
                            value={dialogInput}
                            onChange={(e) => setDialogInput(e.target.value)}
                            onKeyDown={handleDialogKeyDown}
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleDialogEnviar}>Enviar</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Abrir painel</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Editar perfil</SheetTitle>
                        <SheetDescription>
                          Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Abrir gaveta</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Você tem certeza?</DrawerTitle>
                        <DrawerDescription>
                          Esta ação não pode ser desfeita.
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <Button>Enviar</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Abrir popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensões</h4>
                        <p className="text-sm text-muted-foreground">
                          Defina as dimensões da camada.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Passe o mouse</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Adicionar à biblioteca</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Menus Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Menus</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Menu suspenso</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Perfil</DropdownMenuItem>
                      <DropdownMenuItem>Faturamento</DropdownMenuItem>
                      <DropdownMenuItem>Equipe</DropdownMenuItem>
                      <DropdownMenuItem>Assinatura</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <Button variant="outline">Clique com o botão direito</Button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>Perfil</ContextMenuItem>
                      <ContextMenuItem>Faturamento</ContextMenuItem>
                      <ContextMenuItem>Equipe</ContextMenuItem>
                      <ContextMenuItem>Assinatura</ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="outline">Cartão ao passar o mouse</Button>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                          Framework React — criado e mantido por @vercel.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Calendário Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Calendário</h3>
            <Card>
              <CardContent className="pt-6 flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </section>

          {/* Carrossel Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Carrossel</h3>
            <Card>
              <CardContent className="pt-6">
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-semibold">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </section>

          {/* Toggle Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Alternador</h3>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Alternador</Label>
                  <div className="flex gap-2">
                    <Toggle aria-label="Alternar itálico">
                      <span className="font-bold">B</span>
                    </Toggle>
                    <Toggle aria-label="Alternar itálico">
                      <span className="italic">I</span>
                    </Toggle>
                    <Toggle aria-label="Alternar sublinhado">
                      <span className="underline">U</span>
                    </Toggle>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Grupo de alternadores</Label>
                  <ToggleGroup type="multiple">
                    <ToggleGroupItem value="bold" aria-label="Alternar negrito">
                      <span className="font-bold">B</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Alternar itálico">
                      <span className="italic">I</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="underline"
                      aria-label="Alternar sublinhado"
                    >
                      <span className="underline">U</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Aspect Ratio & Scroll Area Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Componentes de layout</h3>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label>Proporção (16/9)</Label>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-muted-foreground">Proporção 16:9</p>
                    </div>
                  </AspectRatio>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Área rolável</Label>
                  <ScrollArea className="h-[200px] w-full rounded-md border overflow-hidden">
                    <div className="p-4">
                      <div className="space-y-4">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="text-sm">
                            Item {i + 1}: esta é uma área de conteúdo rolável
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Resizable Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Painéis redimensionáveis</h3>
            <Card>
              <CardContent className="pt-6">
                <ResizablePanelGroup
                  direction="horizontal"
                  className="min-h-[200px] rounded-lg border"
                >
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-semibold">Painel um</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-semibold">Painel dois</span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </CardContent>
            </Card>
          </section>

          {/* Notificação Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Notificação</h3>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Notificação Sonnerificação</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        sonnerToast.success("Operação concluída", {
                          description: "Suas alterações foram salvas",
                        });
                      }}
                    >
                      Sucesso
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        sonnerToast.error("Operação falhou", {
                          description:
                            "Não foi possível concluir a operação; tente novamente",
                        });
                      }}
                    >
                      Erro
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        sonnerToast.info("Informação", {
                          description: "Esta é uma mensagem informativa",
                        });
                      }}
                    >
                      Informação
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        sonnerToast.warning("Atenção", {
                          description:
                            "Observe o impacto desta operação",
                        });
                      }}
                    >
                      Atenção
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        sonnerToast.loading("Carregando", {
                          description: "Aguarde",
                        });
                      }}
                    >
                      Carregando
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const promise = new Promise(resolve =>
                          setTimeout(resolve, 2000)
                        );
                        sonnerToast.promise(promise, {
                          loading: "Processando...",
                          success: "Processamento concluído!",
                          error: "O processamento falhou",
                        });
                      }}
                    >
                      Promessa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Caixa de chat com IA Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Caixa de chat com IA</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Componente de chat pronto para uso, integrado ao sistema LLM.
                      Inclui renderização Markdown, rolagem automática e estados de carregamento.
                    </p>
                    <p className="mt-2">
                      Esta é uma demonstração com respostas simuladas. Em um app real, ela seria conectada a uma mutação tRPC.
                    </p>
                  </div>
                  <AIChatBox
                    messages={chatMessages}
                    onSendMessage={handleChatSend}
                    isLoading={isChatLoading}
                    placeholder="Escreva uma mensagem..."
                    height="500px"
                    emptyStateMessage="Como posso ajudar hoje?"
                    suggestedPrompts={[
                      "O que é React?",
                      "Explique TypeScript",
                      "Como usar tRPC?",
                      "Boas práticas para desenvolvimento web",
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Showcase de componentes Shadcn/ui</p>
        </div>
      </footer>
    </div>
  );
}
