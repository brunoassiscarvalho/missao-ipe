import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BatteryCharging,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Cpu,
  Gauge,
  LockKeyhole,
  Orbit,
  Radio,
  Rocket,
  RotateCcw,
  Satellite,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  Trophy,
  Weight,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from "react-router";

type Mission = {
  id: string;
  code: string;
  level: number;
  name: string;
  destination: string;
  objective: string;
  payload: string;
  distance: string;
  duration: string;
  reward: string;
  color: string;
  story: {
    year: string;
    headline: string;
    opening: string;
    briefing: string;
    challenge: string;
    callSign: string;
  };
};

type ComponentOption = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  fact: string;
  mass: number;
  cost: number;
  energy: number;
  reliability: number;
  statLabel: string;
  statValue: string;
};

type ComponentGroup = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  options: ComponentOption[];
};

const missions: Mission[] = [
  {
    id: "iss",
    code: "MISSÃO 01",
    level: 1,
    name: "Pulso Orbital",
    destination: "Estação Espacial Internacional",
    objective: "Entregar um monitor atmosférico de alta precisão à tripulação da ISS.",
    payload: "120 kg",
    distance: "400 km",
    duration: "30 dias",
    reward: "450 XP",
    color: "cyan",
    story: {
      year: "2031",
      headline: "O ar da estação conta uma história invisível.",
      opening:
        "A tripulação da ISS detectou variações mínimas na composição do ar. Nada ameaça os astronautas agora, mas os sensores atuais não conseguem explicar o padrão.",
      briefing:
        "Em 72 horas, uma janela de lançamento se abre. Sua equipe deve entregar o AERIS, um monitor atmosférico capaz de identificar partículas e gases em concentrações extremamente baixas.",
      challenge:
        "A carga é sensível a vibrações e precisa chegar à estação com energia suficiente para iniciar a calibração ainda durante o acoplamento.",
      callSign: "AERIS-01",
    },
  },
  {
    id: "luna",
    code: "MISSÃO 02",
    level: 2,
    name: "Eco Lunar",
    destination: "Polo Sul da Lua",
    objective: "Transportar um espectrômetro para mapear depósitos de gelo lunar.",
    payload: "240 kg",
    distance: "384 mil km",
    duration: "48 dias",
    reward: "780 XP",
    color: "violet",
    story: {
      year: "2034",
      headline: "No polo sul lunar, sombras guardam água há bilhões de anos.",
      opening:
        "Regiões que nunca recebem luz solar podem preservar gelo antigo. Confirmar sua distribuição mudará a forma como futuras bases humanas serão planejadas.",
      briefing:
        "O espectrômetro SELENE deve alcançar uma órbita polar e mapear as crateras permanentemente sombreadas sem contaminar suas medições.",
      challenge:
        "A longa viagem exige navegação precisa, controle térmico rigoroso e energia estável durante passagens prolongadas pela sombra.",
      callSign: "SELENE-02",
    },
  },
  {
    id: "mars",
    code: "MISSÃO 03",
    level: 3,
    name: "Horizonte Rubro",
    destination: "Cratera Jezero, Marte",
    objective: "Levar uma estação meteorológica autônoma para a superfície marciana.",
    payload: "460 kg",
    distance: "225 mi km",
    duration: "210 dias",
    reward: "1.240 XP",
    color: "orange",
    story: {
      year: "2037",
      headline: "Uma tempestade se forma além do horizonte de Marte.",
      opening:
        "Os orbitadores registraram uma frente de poeira incomum avançando sobre a Cratera Jezero. Na superfície, ainda faltam dados para prever sua intensidade.",
      briefing:
        "A estação meteorológica ARGO precisa pousar antes da tempestade para medir pressão, ventos, temperatura e partículas suspensas na atmosfera.",
      challenge:
        "Meses de viagem e a entrada atmosférica marciana exigem sistemas redundantes, proteção térmica e comunicação de grande alcance.",
      callSign: "ARGO-03",
    },
  },
  {
    id: "europa",
    code: "MISSÃO 04",
    level: 4,
    name: "Oceano Silencioso",
    destination: "Europa, Júpiter",
    objective: "Inserir uma sonda de análise na órbita da lua congelada.",
    payload: "780 kg",
    distance: "628 mi km",
    duration: "5,5 anos",
    reward: "2.100 XP",
    color: "blue",
    story: {
      year: "2042",
      headline: "Sob o gelo de Europa, um oceano pode abrigar as respostas.",
      opening:
        "Plumas de vapor foram observadas acima da superfície congelada. Elas podem carregar compostos vindos diretamente do oceano subterrâneo.",
      briefing:
        "A sonda NEREIDA deverá entrar em órbita de Europa e analisar essas plumas sem tocar a superfície, procurando sais e moléculas orgânicas.",
      challenge:
        "A radiação de Júpiter é intensa e a luz solar é fraca. Cada sistema precisa resistir por anos longe de qualquer reparo.",
      callSign: "NEREIDA-04",
    },
  },
  {
    id: "bennu",
    code: "MISSÃO 05",
    level: 5,
    name: "Retorno Bennu",
    destination: "Asteroide Bennu",
    objective: "Coletar uma amostra do asteroide e devolvê-la com integridade à Terra.",
    payload: "1.050 kg",
    distance: "2,1 bi km",
    duration: "7 anos",
    reward: "3.400 XP",
    color: "pink",
    story: {
      year: "2048",
      headline: "Um fragmento do início do Sistema Solar espera por nós.",
      opening:
        "Bennu preserva matéria quase inalterada desde a formação dos planetas. Uma pequena amostra pode revelar como água e carbono chegaram à Terra.",
      briefing:
        "A nave ÍCARO deverá encontrar o asteroide, tocar sua superfície por poucos segundos e trazer a cápsula de amostras de volta.",
      challenge:
        "A gravidade quase inexistente torna cada manobra delicada. A missão precisa combinar autonomia, precisão e proteção para a reentrada.",
      callSign: "ÍCARO-05",
    },
  },
];

const componentGroups: ComponentGroup[] = [
  {
    id: "vehicle",
    name: "Veículo de lançamento",
    shortName: "Veículo",
    description: "Define a capacidade de carga e a energia disponível para alcançar a órbita.",
    icon: Rocket,
    options: [
      {
        id: "falcon",
        name: "Falcon 9",
        subtitle: "Classe média reutilizável",
        description:
          "Um lançador de dois estágios com primeiro estágio reutilizável. Sua capacidade excede a necessidade da carga e oferece boa margem operacional.",
        fact: "A NASA usa o Falcon 9 em missões de reabastecimento comercial para a ISS.",
        mass: 549,
        cost: 6.2,
        energy: 8,
        reliability: 96,
        statLabel: "Carga para LEO",
        statValue: "22.800 kg",
      },
      {
        id: "atlas",
        name: "Atlas L-2",
        subtitle: "Lançador leve",
        description:
          "Solução compacta para cargas pequenas em órbita baixa. Reduz o custo, mas deixa pouca margem para sistemas redundantes.",
        fact: "Veículos leves são usados para CubeSats e pequenos experimentos em órbita terrestre.",
        mass: 360,
        cost: 4.8,
        energy: 6,
        reliability: 87,
        statLabel: "Carga para LEO",
        statValue: "820 kg",
      },
      {
        id: "vulcan",
        name: "Vulcan Centaur",
        subtitle: "Classe pesada",
        description:
          "Grande capacidade e estágio superior de longa duração. É robusto, mas consome uma parcela maior do orçamento.",
        fact: "Estágios superiores criogênicos usam oxigênio e hidrogênio líquidos para alta eficiência.",
        mass: 720,
        cost: 9.3,
        energy: 9,
        reliability: 98,
        statLabel: "Carga para LEO",
        statValue: "27.200 kg",
      },
      {
        id: "electron",
        name: "Electron",
        subtitle: "Microlançador",
        description:
          "O menor veículo disponível. É ágil e econômico, mas não comporta a cápsula e a carga desta missão.",
        fact: "Microlançadores reduzem o tempo de espera por uma janela de lançamento compartilhada.",
        mass: 300,
        cost: 3.7,
        energy: 5,
        reliability: 79,
        statLabel: "Carga para LEO",
        statValue: "300 kg",
      },
      {
        id: "antares",
        name: "Antares 330",
        subtitle: "Carga orbital",
        description:
          "Projetado para missões de carga em órbita baixa. Oferece bom volume interno para instrumentos científicos.",
        fact: "A família Antares lançou naves de carga Cygnus em missões de reabastecimento da ISS.",
        mass: 610,
        cost: 7.4,
        energy: 8,
        reliability: 93,
        statLabel: "Carga para LEO",
        statValue: "10.500 kg",
      },
      {
        id: "newglenn",
        name: "New Glenn",
        subtitle: "Grande volume",
        description:
          "Coifa ampla e primeiro estágio reutilizável. Capacidade muito acima do necessário para esta missão.",
        fact: "Coifas maiores permitem transportar instrumentos sem dobrar painéis e antenas.",
        mass: 790,
        cost: 10.1,
        energy: 10,
        reliability: 94,
        statLabel: "Carga para LEO",
        statValue: "45.000 kg",
      },
    ],
  },
  {
    id: "propulsion",
    name: "Sistema de propulsão",
    shortName: "Propulsão",
    description: "Controla as manobras orbitais e a aproximação final ao destino.",
    icon: Zap,
    options: [
      {
        id: "chemical",
        name: "Química bipropelente",
        subtitle: "Resposta imediata",
        description:
          "Combina combustível e oxidante líquidos para produzir alto empuxo. Ideal para correções rápidas e acoplamento orbital.",
        fact: "A equação de Tsiolkovsky relaciona a mudança de velocidade à massa de propelente.",
        mass: 128,
        cost: 1.8,
        energy: 4,
        reliability: 94,
        statLabel: "Impulso específico",
        statValue: "320 s",
      },
      {
        id: "ion",
        name: "Propulsão iônica",
        subtitle: "Alta eficiência",
        description:
          "Acelera íons com campos elétricos. Economiza propelente, mas seu baixo empuxo não é adequado para acoplamentos rápidos.",
        fact: "A missão Dawn da NASA usou propulsão iônica para visitar Vesta e Ceres.",
        mass: 74,
        cost: 2.9,
        energy: 22,
        reliability: 86,
        statLabel: "Impulso específico",
        statValue: "3.100 s",
      },
      {
        id: "monoprop",
        name: "Monopropelente",
        subtitle: "Simples e confiável",
        description:
          "Usa um único propelente decomposto por catalisador. Tem menor desempenho, mas alta simplicidade operacional.",
        fact: "Pequenos propulsores permitem controlar atitude e realizar ajustes precisos de órbita.",
        mass: 92,
        cost: 1.3,
        energy: 3,
        reliability: 97,
        statLabel: "Impulso específico",
        statValue: "230 s",
      },
    ],
  },
  {
    id: "energy",
    name: "Geração de energia",
    shortName: "Energia",
    description: "Mantém navegação, comunicação e controle térmico durante toda a viagem.",
    icon: BatteryCharging,
    options: [
      {
        id: "solar",
        name: "Painéis solares",
        subtitle: "Energia renovável orbital",
        description:
          "Células fotovoltaicas convertem luz solar em eletricidade. Em órbita baixa, períodos de sombra exigem baterias de apoio.",
        fact: "A ISS usa grandes painéis solares que acompanham o Sol durante a órbita.",
        mass: 112,
        cost: 2.1,
        energy: -52,
        reliability: 96,
        statLabel: "Potência nominal",
        statValue: "4,8 kW",
      },
      {
        id: "battery",
        name: "Baterias Li-ion",
        subtitle: "Sistema compacto",
        description:
          "Armazena energia suficiente para uma viagem curta. É simples, mas não oferece geração contínua.",
        fact: "Baterias de íons de lítio substituíram unidades antigas de níquel-hidrogênio na ISS.",
        mass: 82,
        cost: 1.2,
        energy: -29,
        reliability: 89,
        statLabel: "Capacidade",
        statValue: "78 kWh",
      },
      {
        id: "hybrid",
        name: "Sistema híbrido",
        subtitle: "Solar e bateria",
        description:
          "Combina geração solar e armazenamento redundante. Aumenta massa e custo, mas garante energia durante eclipses orbitais.",
        fact: "Uma órbita da ISS dura cerca de 90 minutos, alternando períodos de luz e sombra.",
        mass: 148,
        cost: 2.8,
        energy: -64,
        reliability: 99,
        statLabel: "Potência nominal",
        statValue: "6,2 kW",
      },
    ],
  },
  {
    id: "protection",
    name: "Proteção da carga",
    shortName: "Proteção",
    description: "Preserva o instrumento contra vibração, temperatura e partículas orbitais.",
    icon: ShieldCheck,
    options: [
      {
        id: "basic",
        name: "Estrutura básica",
        subtitle: "Baixa massa",
        description:
          "Suporte rígido com isolamento térmico mínimo. Adequado apenas para cargas resistentes.",
        fact: "A vibração no lançamento pode danificar óptica e conexões de instrumentos sensíveis.",
        mass: 42,
        cost: 0.6,
        energy: 0,
        reliability: 76,
        statLabel: "Atenuação",
        statValue: "32%",
      },
      {
        id: "damped",
        name: "Isolamento ativo",
        subtitle: "Controle de vibração",
        description:
          "Amortecedores e sensores neutralizam oscilações durante o lançamento, protegendo instrumentos de alta precisão.",
        fact: "Testes de vibração em solo simulam as cargas mecânicas que o equipamento sofrerá.",
        mass: 94,
        cost: 1.7,
        energy: 3,
        reliability: 98,
        statLabel: "Atenuação",
        statValue: "94%",
      },
      {
        id: "thermal",
        name: "Manta multicamada",
        subtitle: "Proteção térmica",
        description:
          "Camadas refletivas reduzem a troca de calor no vácuo e estabilizam a temperatura do instrumento.",
        fact: "As mantas douradas vistas em sondas são isolantes multicamada, não painéis solares.",
        mass: 67,
        cost: 1.1,
        energy: 1,
        reliability: 91,
        statLabel: "Faixa térmica",
        statValue: "−80 a 120 °C",
      },
    ],
  },
  {
    id: "navigation",
    name: "Navegação e comunicação",
    shortName: "Navegação",
    description: "Determina a posição da nave e mantém contato com a equipe em solo.",
    icon: Radio,
    options: [
      {
        id: "startracker",
        name: "Star tracker + banda S",
        subtitle: "Precisão orbital",
        description:
          "Câmeras reconhecem padrões de estrelas para orientar a nave, enquanto a antena transmite telemetria.",
        fact: "Star trackers comparam imagens do céu com um catálogo estelar armazenado a bordo.",
        mass: 38,
        cost: 1.4,
        energy: 8,
        reliability: 96,
        statLabel: "Precisão angular",
        statValue: "0,01°",
      },
      {
        id: "gps",
        name: "GPS orbital",
        subtitle: "Leve e econômico",
        description:
          "Usa sinais de satélites de navegação para determinar posição e velocidade em órbita baixa.",
        fact: "Receptores espaciais de GPS precisam compensar velocidades muito maiores que as terrestres.",
        mass: 24,
        cost: 0.8,
        energy: 5,
        reliability: 89,
        statLabel: "Precisão de posição",
        statValue: "10 m",
      },
      {
        id: "redundant",
        name: "Navegação redundante",
        subtitle: "Máxima confiabilidade",
        description:
          "Combina star tracker, sensores solares e GPS. Continua operando mesmo após a falha de um subsistema.",
        fact: "Redundância evita que uma única falha comprometa toda a missão.",
        mass: 61,
        cost: 2.2,
        energy: 12,
        reliability: 99,
        statLabel: "Sistemas de apoio",
        statValue: "3× redundante",
      },
    ],
  },
];

const initialSelection: Record<string, string> = {
  vehicle: "falcon",
  propulsion: "chemical",
  energy: "solar",
  protection: "damped",
  navigation: "startracker",
};

function MissionOrb({ mission }: { mission: Mission }) {
  return (
    <div className="mission-orb" data-color={mission.color} aria-hidden="true">
      <div className="orb-glow" />
      <div className="orb-planet">
        <i />
        <b />
      </div>
      <div className="orb-ring" />
      <Satellite className="orb-satellite" size={23} />
    </div>
  );
}

function MissionStageNavigation({
  mission,
  currentStep,
  inContext = false,
}: {
  mission: Mission;
  currentStep?: number;
  inContext?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <nav
      className={`stage-navigation${inContext ? " context-stage-navigation" : ""}`}
      aria-label="Navegação da missão"
    >
      <button
        className="stage-nav-card"
        data-state={inContext ? "active" : "context"}
        aria-current={inContext ? "page" : undefined}
        onClick={() => navigate(`/mission/${mission.id}/context`)}
      >
        <i className="stage-nav-planet" data-color={mission.color} aria-hidden="true" />
        <span>Contexto</span>
      </button>
      {componentGroups.map((item, index) => {
        const Icon = item.icon;
        const state =
          currentStep === undefined
            ? "next"
            : index < currentStep
              ? "done"
              : index === currentStep
                ? "active"
                : "next";
        return (
          <button
            className="stage-nav-card"
            data-state={state}
            aria-current={index === currentStep ? "step" : undefined}
            key={item.id}
            onClick={() => navigate(`/mission/${mission.id}/build/${index}`)}
          >
            <Icon size={16} />
            <span>{item.shortName}</span>
            {state === "done" && (
              <i className="stage-nav-check" aria-label="Etapa visitada">
                <Check size={8} />
              </i>
            )}
          </button>
        );
      })}
    </nav>
  );
}

function MissionsScreen({ unlockedLevel }: { unlockedLevel: number }) {
  const navigate = useNavigate();
  const railRef = useRef<HTMLDivElement>(null);

  const move = (direction: number) => {
    railRef.current?.scrollBy({
      left: direction * Math.min(440, railRef.current.clientWidth * 0.72),
      behavior: "smooth",
    });
  };

  return (
    <main className="missions-screen">
      <button
        className="player-avatar"
        aria-label="Perfil de Ana Costa"
        title="Perfil de Ana Costa"
      >
        <span>AC</span>
        <i aria-hidden="true" />
      </button>
      <section className="mission-carousel" aria-label="Missões disponíveis">
        <div className="carousel-intro">
          <span className="kicker">PROGRAMA DE EXPLORAÇÃO</span>
          <h1>Escolha sua próxima missão</h1>
          <p>Cada conquista abre uma nova fronteira.</p>
        </div>
        <div className="carousel-rail" ref={railRef}>
          {missions.map((mission) => {
            const locked = mission.level > unlockedLevel;
            return (
              <article className="mission-card" data-locked={locked} key={mission.id}>
                <MissionOrb mission={mission} />
                <div className="mission-card-copy">
                  <div className="mission-card-top">
                    <span>{mission.code}</span>
                    <span className="level-chip">
                      {locked && <LockKeyhole size={11} />}
                      NÍVEL {mission.level}
                    </span>
                  </div>
                  <h2>{mission.name}</h2>
                  <p>{mission.destination}</p>
                  <div className="mission-facts">
                    <span>
                      <Target size={13} /> {mission.payload}
                    </span>
                    <span>
                      <Orbit size={13} /> {mission.distance}
                    </span>
                    <span>
                      <Trophy size={13} /> {mission.reward}
                    </span>
                  </div>
                  <button
                    disabled={locked}
                    onClick={() => navigate(`/mission/${mission.id}/context`)}
                    aria-label={
                      locked
                        ? `${mission.name} bloqueada. Conclua o nível ${mission.level - 1}.`
                        : `Selecionar missão ${mission.name}`
                    }
                  >
                    {locked ? (
                      <>
                        Conclua o nível {mission.level - 1} <LockKeyhole size={14} />
                      </>
                    ) : (
                      <>
                        Selecionar missão <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="carousel-controls">
          <button onClick={() => move(-1)} aria-label="Missões anteriores">
            <ChevronLeft size={19} />
          </button>
          <span>
            <i /> ARRASTE PARA EXPLORAR
          </span>
          <button onClick={() => move(1)} aria-label="Próximas missões">
            <ChevronRight size={19} />
          </button>
        </div>
      </section>
    </main>
  );
}

function MissionContextScreen() {
  const navigate = useNavigate();
  const { missionId = "iss" } = useParams();
  const mission = missions.find((item) => item.id === missionId) ?? missions[0];

  return (
    <main className="context-screen">
      <section className="context-content">
        <MissionStageNavigation mission={mission} inContext />
        <div className="context-story">
          <div className="context-heading">
            <span className="kicker">
              {mission.code} · BRIEFING {mission.story.year}
            </span>
            <h1>{mission.story.headline}</h1>
            <p>{mission.story.opening}</p>
          </div>

          <div className="story-transmission">
            <span className="transmission-icon">
              <Radio size={18} />
            </span>
            <div>
              <small>TRANSMISSÃO DO CONTROLE DA MISSÃO</small>
              <p>{mission.story.briefing}</p>
            </div>
          </div>

          <div className="context-challenge">
            <span>
              <BookOpen size={15} /> SEU DESAFIO
            </span>
            <p>{mission.story.challenge}</p>
          </div>
        </div>

        <aside className="context-visual" aria-label={`Destino: ${mission.destination}`}>
          <div className="context-orbit context-orbit-outer" />
          <div className="context-orbit context-orbit-inner" />
          <MissionOrb mission={mission} />
          <div className="context-target">
            <span>DESTINO CONFIRMADO</span>
            <strong>{mission.destination}</strong>
            <small>{mission.story.callSign}</small>
          </div>
          <dl className="context-metrics">
            <div>
              <dt>
                <Orbit size={13} /> DISTÂNCIA
              </dt>
              <dd>{mission.distance}</dd>
            </div>
            <div>
              <dt>
                <Clock3 size={13} /> DURAÇÃO
              </dt>
              <dd>{mission.duration}</dd>
            </div>
            <div>
              <dt>
                <Target size={13} /> CARGA
              </dt>
              <dd>{mission.payload}</dd>
            </div>
          </dl>
        </aside>
      </section>
      <BottomActions
        backLabel="Missões"
        nextLabel="Montar a nave"
        onBack={() => navigate("/")}
        onNext={() => navigate(`/mission/${mission.id}/build/0`)}
      />
    </main>
  );
}

function ComponentVisual({ group, option }: { group: ComponentGroup; option: ComponentOption }) {
  const Icon = group.icon;
  return (
    <div className="component-visual" data-group={group.id} aria-hidden="true">
      <div className="visual-aura" />
      <div className="blueprint-rings">
        <i />
        <i />
        <i />
      </div>
      <div className="technical-object">
        <Icon size={92} strokeWidth={1.15} />
        <span />
      </div>
      <div className="data-node node-a">A.01</div>
      <div className="data-node node-b">SYS.OK</div>
      <div className="data-node node-c">{option.reliability}%</div>
    </div>
  );
}

function BottomActions({
  backLabel = "Voltar",
  nextLabel = "Avançar",
  onBack,
  onNext,
}: {
  backLabel?: string;
  nextLabel?: string;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="bottom-actions">
      <button className="back-action" onClick={onBack}>
        <ArrowLeft size={17} /> {backLabel}
      </button>
      <button className="next-action" onClick={onNext}>
        {nextLabel} <ArrowRight size={17} />
      </button>
    </div>
  );
}

function BuildScreen({
  selection,
  onSelect,
}: {
  selection: Record<string, string>;
  onSelect: (groupId: string, optionId: string) => void;
}) {
  const navigate = useNavigate();
  const { missionId = "iss", step = "0" } = useParams();
  const stepIndex = Math.min(componentGroups.length - 1, Math.max(0, Number(step) || 0));
  const group = componentGroups[stepIndex];
  const selectedId = selection[group.id] ?? group.options[0].id;
  const selected = group.options.find((option) => option.id === selectedId) ?? group.options[0];
  const mission = missions.find((item) => item.id === missionId) ?? missions[0];

  const previous = () => {
    if (stepIndex === 0) navigate(`/mission/${missionId}/context`);
    else navigate(`/mission/${missionId}/build/${stepIndex - 1}`);
  };

  const next = () => {
    if (stepIndex === componentGroups.length - 1) navigate(`/mission/${missionId}/review`);
    else navigate(`/mission/${missionId}/build/${stepIndex + 1}`);
  };

  return (
    <main className="build-screen">
      <section className="build-content">
        <div className="stage-copy">
          <span className="kicker">
            {mission.code} · ETAPA {stepIndex + 1} DE {componentGroups.length}
          </span>
          <h1>{group.name}</h1>
          <p>{group.description}</p>
          <MissionStageNavigation mission={mission} currentStep={stepIndex} />
        </div>

        <div className="component-layout">
          <section className="component-grid-wrap" aria-label={`Opções de ${group.name}`}>
            <div className="component-grid">
              {group.options.map((option) => {
                const active = selected.id === option.id;
                const Icon = group.icon;
                return (
                  <button
                    key={option.id}
                    className="component-card"
                    data-active={active}
                    aria-pressed={active}
                    onClick={() => onSelect(group.id, option.id)}
                  >
                    <span className="component-card-icon">
                      <Icon size={24} strokeWidth={1.45} />
                    </span>
                    <span className="component-card-title">
                      <strong>{option.name}</strong>
                      <small>{option.subtitle}</small>
                    </span>
                    <span className="component-card-stats">
                      <small>
                        <Weight size={11} /> {option.mass} kg
                      </small>
                      <small>
                        <CircleDollarSign size={11} /> {option.cost.toFixed(1)} mi
                      </small>
                    </span>
                    <span className="selection-mark">
                      <Check size={12} />
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="component-detail" aria-live="polite">
            <ComponentVisual group={group} option={selected} />
            <div className="detail-copy">
              <span className="detail-type">{group.shortName.toUpperCase()} SELECIONADO</span>
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>
              <dl className="detail-stats">
                <div>
                  <dt>MASSA</dt>
                  <dd>{selected.mass} kg</dd>
                </div>
                <div>
                  <dt>CONFIABILIDADE</dt>
                  <dd>{selected.reliability}%</dd>
                </div>
                <div>
                  <dt>{selected.statLabel.toUpperCase()}</dt>
                  <dd>{selected.statValue}</dd>
                </div>
              </dl>
              <aside className="nasa-fact">
                <span>
                  <Atom size={15} /> DADO DIDÁTICO
                </span>
                <p>{selected.fact}</p>
                <small>Baseado em conceitos e missões publicados pela NASA.</small>
              </aside>
            </div>
          </section>
        </div>
      </section>
      <BottomActions
        backLabel={stepIndex === 0 ? "Contexto" : componentGroups[stepIndex - 1].shortName}
        nextLabel={
          stepIndex === componentGroups.length - 1
            ? "Revisar missão"
            : componentGroups[stepIndex + 1].shortName
        }
        onBack={previous}
        onNext={next}
      />
    </main>
  );
}

type MissionMetrics = {
  mass: number;
  cost: number;
  energy: number;
  reliability: number;
  integrity: number;
  ready: boolean;
};

function ReviewScreen({
  selection,
  metrics,
}: {
  selection: Record<string, string>;
  metrics: MissionMetrics;
}) {
  const navigate = useNavigate();
  const { missionId = "iss" } = useParams();
  const mission = missions.find((item) => item.id === missionId) ?? missions[0];

  return (
    <main className="review-screen">
      <section className="review-content">
        <div className="review-intro">
          <span className="kicker">REVISÃO FINAL · {mission.code}</span>
          <h1>Arquitetura pronta para voo</h1>
          <p>Confira os sistemas e os indicadores antes de executar a missão.</p>
        </div>
        <div className="review-layout">
          <section className="assembly-overview">
            <div className="review-spacecraft" aria-hidden="true">
              <div className="review-orbit" />
              <Rocket size={130} strokeWidth={0.85} />
              <span className="review-pulse" />
            </div>
            <div className="selected-systems">
              {componentGroups.map((group) => {
                const option = group.options.find((item) => item.id === selection[group.id])!;
                const Icon = group.icon;
                return (
                  <div key={group.id}>
                    <span>
                      <Icon size={15} />
                    </span>
                    <small>{group.shortName}</small>
                    <strong>{option.name}</strong>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mission-summary">
            <div className="summary-destination">
              <span>
                <Orbit size={17} /> DESTINO
              </span>
              <strong>{mission.destination}</strong>
              <small>{mission.objective}</small>
            </div>
            <div className="summary-metrics">
              <div>
                <span>
                  <Weight size={16} /> MASSA TOTAL
                </span>
                <strong>{metrics.mass.toLocaleString("pt-BR")} kg</strong>
                <small>Capacidade aprovada</small>
              </div>
              <div>
                <span>
                  <BatteryCharging size={16} /> ENERGIA
                </span>
                <strong>{metrics.energy}%</strong>
                <small>Reserva estimada</small>
              </div>
              <div>
                <span>
                  <CircleDollarSign size={16} /> CUSTO
                </span>
                <strong>${metrics.cost.toFixed(1)} mi</strong>
                <small>Limite: $15 mi</small>
              </div>
              <div>
                <span>
                  <ShieldCheck size={16} /> INTEGRIDADE
                </span>
                <strong>{metrics.integrity}%</strong>
                <small>Meta: 95%</small>
              </div>
            </div>
            <div className="board-status" data-ready={metrics.ready}>
              <span>{metrics.ready ? <Check size={19} /> : <Gauge size={19} />}</span>
              <div>
                <small>MISSION REVIEW BOARD</small>
                <strong>
                  {metrics.ready ? "Projeto aprovado" : "Projeto aprovado com ressalvas"}
                </strong>
                <p>
                  {metrics.ready
                    ? "Todos os sistemas críticos estão dentro dos limites."
                    : "A missão pode seguir, mas há parâmetros fora da faixa ideal."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
      <BottomActions
        backLabel="Navegação"
        nextLabel="Executar missão"
        onBack={() => navigate(`/mission/${missionId}/build/${componentGroups.length - 1}`)}
        onNext={() => navigate(`/mission/${missionId}/results`)}
      />
    </main>
  );
}

function ResultsScreen({
  metrics,
  onComplete,
}: {
  metrics: MissionMetrics;
  onComplete: () => void;
}) {
  const navigate = useNavigate();
  const { missionId = "iss" } = useParams();
  const mission = missions.find((item) => item.id === missionId) ?? missions[0];

  const finish = () => {
    onComplete();
    navigate("/");
  };

  return (
    <main className="results-screen">
      <div className="result-ambient" aria-hidden="true">
        <div className="result-planet" />
        <div className="result-path" />
        <Satellite size={36} />
      </div>
      <section className="results-card">
        <div className="result-emblem" data-success={metrics.ready}>
          {metrics.ready ? <Trophy size={34} /> : <Target size={34} />}
        </div>
        <span className="kicker">RELATÓRIO · {mission.code}</span>
        <h1>{metrics.ready ? "Missão concluída" : "Sucesso parcial"}</h1>
        <p>
          {metrics.ready
            ? "A carga foi acoplada à ISS e está operando dentro dos parâmetros científicos."
            : "A carga chegou ao destino, mas parte dos objetivos científicos foi comprometida."}
        </p>
        <div className="result-score">
          <div>
            <small>INTEGRIDADE</small>
            <strong>{metrics.integrity}%</strong>
          </div>
          <div>
            <small>CONFIABILIDADE</small>
            <strong>{metrics.reliability}%</strong>
          </div>
          <div>
            <small>EXPERIÊNCIA</small>
            <strong>{metrics.ready ? "+450 XP" : "+120 XP"}</strong>
          </div>
        </div>
        <aside className="result-learning">
          <Sparkles size={18} />
          <div>
            <strong>O que aprendemos</strong>
            <p>
              Em engenharia espacial, massa, energia e redundância estão conectadas. Uma escolha
              mais segura quase sempre exige aceitar maior custo ou peso.
            </p>
          </div>
        </aside>
        <div className="result-buttons">
          <button onClick={() => navigate(`/mission/${missionId}/build/0`)}>
            <RotateCcw size={16} /> Reprojetar
          </button>
          <button className="next-action" onClick={finish}>
            {metrics.ready ? "Desbloquear próxima missão" : "Voltar às missões"}{" "}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

function Game() {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [selection, setSelection] = useState(initialSelection);

  const selectedOptions = useMemo(
    () =>
      componentGroups.map(
        (group) =>
          group.options.find((option) => option.id === selection[group.id]) ?? group.options[0],
      ),
    [selection],
  );

  const metrics = useMemo<MissionMetrics>(() => {
    const mass = 120 + selectedOptions.reduce((sum, option) => sum + option.mass, 0);
    const cost = selectedOptions.reduce((sum, option) => sum + option.cost, 0);
    const energyDraw = selectedOptions.reduce((sum, option) => sum + option.energy, 0);
    const energy = Math.max(14, Math.min(99, 64 - energyDraw));
    const reliability = Math.round(
      selectedOptions.reduce((sum, option) => sum + option.reliability, 0) / selectedOptions.length,
    );
    const protection =
      selection.protection === "damped" ? 5 : selection.protection === "thermal" ? -2 : -12;
    const integrity = Math.min(99, Math.max(68, reliability + protection));
    const ready = mass < 1800 && cost <= 15 && energy >= 30 && integrity >= 95;
    return { mass, cost, energy, reliability, integrity, ready };
  }, [selectedOptions, selection.protection]);

  return (
    <Routes>
      <Route path="/" element={<MissionsScreen unlockedLevel={unlockedLevel} />} />
      <Route path="/mission/:missionId/context" element={<MissionContextScreen />} />
      <Route
        path="/mission/:missionId/build/:step"
        element={
          <BuildScreen
            selection={selection}
            onSelect={(groupId, optionId) =>
              setSelection((current) => ({ ...current, [groupId]: optionId }))
            }
          />
        }
      />
      <Route
        path="/mission/:missionId/review"
        element={<ReviewScreen selection={selection} metrics={metrics} />}
      />
      <Route
        path="/mission/:missionId/results"
        element={
          <ResultsScreen
            metrics={metrics}
            onComplete={() => metrics.ready && setUnlockedLevel((level) => Math.min(5, level + 1))}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Game />
    </BrowserRouter>
  );
}
