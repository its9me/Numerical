import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Calculator, 
  GitBranch, 
  Layers, 
  ShieldCheck, 
  ChevronRight, 
  Info, 
  AlertCircle,
  Play,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  Circle,
  Activity,
  Coins,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

// --- Types ---
type Section = 'intro' | 'lecture1' | 'lecture2' | 'lecture3' | 'cyber';

interface ExperimentStage {
  id: string;
  name: string;
  outcomes: string[];
}

// --- Components ---

const Navbar = ({ activeSection, onSelect }: { activeSection: Section, onSelect: (id: Section) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const items = [
    { id: 'intro', label: 'Overview', labelAr: 'نظرة عامة', icon: <Info className="w-4 h-4" /> },
    { id: 'lecture1', label: 'Numerical Analysis', labelAr: 'التحليل العددي', icon: <Calculator className="w-4 h-4" /> },
    { id: 'lecture2', label: 'Sample Space', labelAr: 'فضاء العينة', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'lecture3', label: 'Probability', labelAr: 'الاحتمالية', icon: <Layers className="w-4 h-4" /> },
    { id: 'cyber', label: 'Cyber Security', labelAr: 'الأمن السيبراني', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">Cyber-Numeric Hub</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id as Section)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeSection === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex flex-col items-center leading-tight">
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>
                <span className="text-[10px] opacity-80 font-normal">{item.labelAr}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item.id as Section);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left ${
                    activeSection === item.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <div className="flex flex-col">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs opacity-70">{item.labelAr}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Practical Tools ---

const NumericalLab = () => {
  const [val, setVal] = useState(2);
  const [precision, setPrecision] = useState(4);
  
  const trueVal = Math.sqrt(val);
  const approx = parseFloat(trueVal.toFixed(precision));
  const absError = Math.abs(trueVal - approx);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Numerical Lab</h3>
          <p className="text-xs text-slate-500">مختبر التحليل العددي</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Number to Root (√x)</label>
          <p className="text-[10px] text-slate-400 mb-2">الرقم المراد حساب جذره</p>
          <input 
            type="number" 
            value={val} 
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Precision: {precision}</label>
          <p className="text-[10px] text-slate-400 mb-2">الدقة المطلوبة</p>
          <input 
            type="range" min="1" max="15" value={precision} 
            onChange={(e) => setPrecision(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl text-white font-mono text-sm space-y-2">
        <div className="flex justify-between"><span className="text-slate-400">Exact (القيمة الحقيقية):</span> {trueVal}</div>
        <div className="flex justify-between"><span className="text-blue-400">Approx (التقريبية):</span> {approx}</div>
        <div className="flex justify-between text-red-400"><span className="text-slate-400">Error (الخطأ):</span> {absError.toExponential(4)}</div>
      </div>
    </div>
  );
};

const TreeDiagramGenerator = () => {
  const [stages, setStages] = useState<ExperimentStage[]>([
    { id: '1', name: 'Coin Flip', outcomes: ['H', 'T'] }
  ]);

  const addStage = () => {
    if (stages.length >= 3) return;
    const newId = (stages.length + 1).toString();
    setStages([...stages, { id: newId, name: `Stage ${newId}`, outcomes: ['A', 'B'] }]);
  };

  const removeStage = (id: string) => {
    setStages(stages.filter(s => s.id !== id));
  };

  const updateStage = (id: string, field: keyof ExperimentStage, value: any) => {
    setStages(stages.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const generateSampleSpace = () => {
    let results: string[] = [''];
    stages.forEach(stage => {
      let nextResults: string[] = [];
      results.forEach(res => {
        stage.outcomes.forEach(out => {
          nextResults.push(res + out);
        });
      });
      results = nextResults;
    });
    return results;
  };

  const sampleSpace = generateSampleSpace();

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Tree Generator</h3>
            <p className="text-xs text-slate-500">مولد مخطط الشجرة</p>
          </div>
        </div>
        <button 
          onClick={addStage}
          disabled={stages.length >= 3}
          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 disabled:opacity-50 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {stages.map((stage, idx) => (
          <div key={stage.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Stage {idx + 1}</span>
              {stages.length > 1 && (
                <button onClick={() => removeStage(stage.id)} className="text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder="Stage Name"
                value={stage.name}
                onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500"
              />
              <input 
                type="text" 
                placeholder="Outcomes (A,B,C)"
                value={stage.outcomes.join(',')}
                onChange={(e) => updateStage(stage.id, 'outcomes', e.target.value.split(',').map(s => s.trim()).filter(s => s !== ''))}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl overflow-x-auto">
        <div className="min-w-[300px] py-4">
          <div className="flex items-start gap-8">
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <span className="text-[10px] text-slate-500 font-mono">Start</span>
            </div>
            
            <div className="flex flex-col gap-4">
              {stages[0]?.outcomes.map((out1, i1) => (
                <div key={i1} className="flex items-start gap-8">
                  <div className="relative">
                    <div className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded text-blue-400 text-xs font-bold font-mono">
                      {out1}
                    </div>
                    {stages.length > 1 && <div className="absolute top-1/2 -right-8 w-8 h-[2px] bg-slate-700" />}
                  </div>

                  {stages.length > 1 && (
                    <div className="flex flex-col gap-4">
                      {stages[1].outcomes.map((out2, i2) => (
                        <div key={i2} className="flex items-start gap-8">
                          <div className="relative">
                            <div className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded text-green-400 text-xs font-bold font-mono">
                              {out2}
                            </div>
                            {stages.length > 2 && <div className="absolute top-1/2 -right-8 w-8 h-[2px] bg-slate-700" />}
                          </div>

                          {stages.length > 2 && (
                            <div className="flex flex-col gap-2">
                              {stages[2].outcomes.map((out3, i3) => (
                                <div key={i3} className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded text-indigo-400 text-xs font-bold font-mono">
                                  {out3}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Sample Space (S)</label>
        <div className="flex flex-wrap gap-2">
          {sampleSpace.map((res, i) => (
            <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-600">
              {res}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-slate-400">Total Outcomes: {sampleSpace.length}</p>
      </div>
    </div>
  );
};

const ProbabilityTool = () => {
  const [pa, setPa] = useState(0.6);
  const [pb, setPb] = useState(0.5);
  const [pab, setPab] = useState(0.2);
  
  const union = pa + pb - pab;
  const isInvalid = union > 1 || pa < 0 || pb < 0 || pab < 0 || pab > Math.min(pa, pb);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Axiom Solver</h3>
          <p className="text-xs text-slate-500">محلل بديهيات الاحتمالية</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">P(A)</label>
          <input type="number" step="0.1" value={pa} onChange={(e) => setPa(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">P(B)</label>
          <input type="number" step="0.1" value={pb} onChange={(e) => setPb(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">P(A ∩ B)</label>
          <input type="number" step="0.1" value={pab} onChange={(e) => setPab(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
        </div>
      </div>

      <div className={`p-6 rounded-2xl text-center transition-all ${isInvalid ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100'}`}>
        {isInvalid ? (
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="w-8 h-8" />
            <span className="font-bold">Invalid Axioms!</span>
            <span className="text-xs opacity-80">بديهيات غير صالحة!</span>
          </div>
        ) : (
          <div>
            <div className="text-xs font-bold uppercase opacity-80 mb-1">P(A ∪ B) Result</div>
            <div className="text-4xl font-black">{union.toFixed(2)}</div>
            <div className="text-[10px] mt-2 opacity-70 font-mono">Formula: P(A) + P(B) - P(A ∩ B)</div>
          </div>
        )}
      </div>
    </div>
  );
};

const VennDiagramTool = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [rangeMax, setRangeMax] = useState(15);
  const [ruleA, setRuleA] = useState(2);
  const [ruleB, setRuleB] = useState(3);

  const universalSet = useMemo(() => Array.from({ length: rangeMax }, (_, i) => i + 1), [rangeMax]);
  const setA = useMemo(() => universalSet.filter(x => x % ruleA === 0), [universalSet, ruleA]);
  const setB = useMemo(() => universalSet.filter(x => x % ruleB === 0), [universalSet, ruleB]);

  const regions = [
    { id: 'A', label: 'A', labelAr: 'المجموعة A', color: 'bg-blue-500', fill: '#3b82f6', notation: 'A', nameAr: 'المجموعة A' },
    { id: 'B', label: 'B', labelAr: 'المجموعة B', color: 'bg-rose-500', fill: '#f43f5e', notation: 'B', nameAr: 'المجموعة B' },
    { id: 'intersection', label: 'A ∩ B', labelAr: 'التقاطع', color: 'bg-purple-500', fill: '#a855f7', notation: 'A ∩ B', nameAr: 'تقاطع المجموعتين' },
    { id: 'union', label: 'A ∪ B', labelAr: 'الاتحاد', color: 'bg-indigo-500', fill: '#6366f1', notation: 'A ∪ B', nameAr: 'اتحاد المجموعتين' },
    { id: 'complementA', label: "A'", labelAr: 'متممة A', color: 'bg-slate-500', fill: '#64748b', notation: "A'", nameAr: 'متممة المجموعة A' },
    { id: 'complementB', label: "B'", labelAr: 'متممة B', color: 'bg-slate-500', fill: '#64748b', notation: "B'", nameAr: 'متممة المجموعة B' },
    { id: 'outside', label: 'S', labelAr: 'الفضاء', color: 'bg-slate-400', fill: '#94a3b8', notation: 'S', nameAr: 'فضاء العينة (خارج المجموعات)' },
  ];

  const getResultingSet = (regionId: string | null) => {
    if (!regionId) return [];
    switch (regionId) {
      case 'A': return setA;
      case 'B': return setB;
      case 'intersection': return setA.filter(x => setB.includes(x));
      case 'union': return Array.from(new Set([...setA, ...setB])).sort((a, b) => a - b);
      case 'complementA': return universalSet.filter(x => !setA.includes(x));
      case 'complementB': return universalSet.filter(x => !setB.includes(x));
      case 'outside': return universalSet.filter(x => !setA.includes(x) && !setB.includes(x));
      default: return [];
    }
  };

  const resultingSet = getResultingSet(activeRegion);

  const isHighlighted = (part: 'onlyA' | 'onlyB' | 'mid' | 'outside') => {
    if (!activeRegion) return false;
    switch (activeRegion) {
      case 'A': return part === 'onlyA' || part === 'mid';
      case 'B': return part === 'onlyB' || part === 'mid';
      case 'intersection': return part === 'mid';
      case 'union': return part === 'onlyA' || part === 'onlyB' || part === 'mid';
      case 'complementA': return part === 'onlyB' || part === 'outside';
      case 'complementB': return part === 'onlyA' || part === 'outside';
      case 'outside': return part === 'outside';
      default: return false;
    }
  };

  const getFillColor = (part: 'onlyA' | 'onlyB' | 'mid' | 'outside') => {
    if (!isHighlighted(part)) return 'transparent';
    return regions.find(r => r.id === activeRegion)?.fill || '#cbd5e1';
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <Circle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Set Operations Lab</h3>
          <p className="text-xs text-slate-500">مختبر العمليات على المجموعات</p>
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Universal Set S (1 to {rangeMax})</label>
          <input 
            type="range" min="5" max="50" value={rangeMax} 
            onChange={(e) => setRangeMax(Number(e.target.value))} 
            className="w-full accent-slate-600" 
          />
          <p className="text-[10px] text-slate-400">فضاء العينة من 1 إلى {rangeMax}</p>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-blue-400 uppercase">Set A: Divisible by {ruleA}</label>
          <input 
            type="number" min="1" max="10" value={ruleA} 
            onChange={(e) => setRuleA(Number(e.target.value))} 
            className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <p className="text-[10px] text-slate-400">الأرقام التي تقبل القسمة على {ruleA}</p>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-rose-400 uppercase">Set B: Divisible by {ruleB}</label>
          <input 
            type="number" min="1" max="10" value={ruleB} 
            onChange={(e) => setRuleB(Number(e.target.value))} 
            className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-rose-500" 
          />
          <p className="text-[10px] text-slate-400">الأرقام التي تقبل القسمة على {ruleB}</p>
        </div>
      </div>

      <div className="relative aspect-video bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden group">
        <svg width="320" height="220" viewBox="0 0 320 220" className="drop-shadow-sm">
          {/* Universal Set S (Background) */}
          <rect 
            x="0" y="0" width="320" height="220" rx="12" 
            fill="white"
            stroke="#e2e8f0" strokeWidth="1"
          />

          {/* Outside Region (S \ (A U B)) */}
          <path 
            d="M 0,0 H 320 V 220 H 0 Z M 130,50 a 60,60 0 1,0 0,120 a 60,60 0 1,0 0,-120 M 190,50 a 60,60 0 1,1 0,120 a 60,60 0 1,1 0,-120"
            fillRule="evenodd"
            fill={getFillColor('outside')}
            className="transition-colors duration-300 cursor-pointer"
            onClick={() => setActiveRegion(activeRegion === 'outside' ? null : 'outside')}
          />
          
          {/* Only A (Left Crescent) */}
          <path 
            d="M 160,58.04 A 60,60 0 1,0 160,161.96 A 60,60 0 0,1 160,58.04"
            fill={getFillColor('onlyA')}
            className="transition-colors duration-300 cursor-pointer hover:opacity-80"
            onClick={() => setActiveRegion('A')}
          />

          {/* Only B (Right Crescent) */}
          <path 
            d="M 160,58.04 A 60,60 0 1,1 160,161.96 A 60,60 0 0,0 160,58.04"
            fill={getFillColor('onlyB')}
            className="transition-colors duration-300 cursor-pointer hover:opacity-80"
            onClick={() => setActiveRegion('B')}
          />

          {/* Intersection (Middle Lens) */}
          <path 
            d="M 160,58.04 A 60,60 0 0,1 160,161.96 A 60,60 0 0,1 160,58.04"
            fill={getFillColor('mid')}
            className="transition-colors duration-300 cursor-pointer hover:opacity-80"
            onClick={() => setActiveRegion('intersection')}
          />

          {/* Outlines */}
          <circle cx="130" cy="110" r="60" fill="none" stroke="#3b82f6" strokeWidth="2" pointerEvents="none" />
          <circle cx="190" cy="110" r="60" fill="none" stroke="#f43f5e" strokeWidth="2" pointerEvents="none" />

          <text x="90" y="70" className="text-sm font-black fill-blue-600 pointer-events-none">A</text>
          <text x="230" y="70" className="text-sm font-black fill-rose-600 pointer-events-none">B</text>
          <text x="15" y="25" className="text-[10px] font-bold fill-slate-400 pointer-events-none">S</text>
        </svg>

        {activeRegion && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 flex justify-between items-center shadow-xl"
          >
            <div className="flex flex-col max-w-[70%]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {regions.find(r => r.id === activeRegion)?.nameAr || 'العملية'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-serif font-black text-indigo-600">
                  {regions.find(r => r.id === activeRegion)?.notation || 'S'}
                </span>
                <span className="text-xs font-bold text-slate-400">({resultingSet.length} elements)</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1 max-h-12 overflow-y-auto">
                {resultingSet.map(num => (
                  <span key={num} className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono font-bold text-slate-600">{num}</span>
                ))}
                {resultingSet.length === 0 && <span className="text-[10px] text-slate-300 italic">Empty Set | مجموعة خالية</span>}
              </div>
            </div>
            <button 
              onClick={() => setActiveRegion(null)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
            className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all border flex flex-col items-center justify-center gap-0.5 ${
              activeRegion === region.id 
                ? `${region.color} text-white border-transparent shadow-lg scale-105 ring-4 ring-indigo-100` 
                : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
            }`}
          >
            <span>{region.label}</span>
            <span className="text-[8px] opacity-70 font-normal">{region.labelAr}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const ErrorVisualizer = () => {
  const [trueVal, setTrueVal] = useState(100);
  const [approxVal, setApproxVal] = useState(105);

  const absError = Math.abs(trueVal - approxVal).toFixed(2);
  const relError = ((Number(absError) / trueVal) * 100).toFixed(2);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Error Visualizer</h3>
          <p className="text-xs text-slate-500">مصور الخطأ</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">True Value: {trueVal}</label>
            <input type="range" min="50" max="150" value={trueVal} onChange={(e) => setTrueVal(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Approx: {approxVal}</label>
            <input type="range" min="50" max="150" value={approxVal} onChange={(e) => setApproxVal(Number(e.target.value))} className="w-full accent-rose-600" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Absolute Error</div>
            <div className="text-2xl font-black text-rose-600">{absError}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Relative Error</div>
            <div className="text-2xl font-black text-amber-600">{relError}%</div>
          </div>
        </div>

        <div className="relative h-12 bg-slate-100 rounded-full flex items-center px-4 overflow-hidden border border-slate-200">
          <div className="absolute inset-x-4 h-0.5 bg-slate-200" />
          <motion.div animate={{ left: `${((trueVal - 50) / 100) * 100}%` }} className="absolute w-3 h-3 bg-blue-600 rounded-full shadow-lg border-2 border-white z-10" />
          <motion.div animate={{ left: `${((approxVal - 50) / 100) * 100}%` }} className="absolute w-3 h-3 bg-rose-600 rounded-full shadow-lg border-2 border-white z-10" />
          <motion.div 
            animate={{ 
              left: `${Math.min(((trueVal - 50) / 100) * 100, ((approxVal - 50) / 100) * 100)}%`,
              width: `${(Math.abs(trueVal - approxVal) / 100) * 100}%`
            }}
            className="absolute h-1 bg-rose-500/20 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const SqrtApproximation = () => {
  const [digits, setDigits] = useState(2);
  const trueSqrt2 = Math.sqrt(2);
  const approx = Number(trueSqrt2.toFixed(digits));
  const error = Math.abs(trueSqrt2 - approx).toExponential(4);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Example: Square Root of 2</h3>
          <p className="text-xs text-slate-500">مثال: الجذر التربيعي لـ 2</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          See how increasing decimal places reduces the error in numerical approximation.
          <br />
          <span className="text-xs text-slate-400">شاهد كيف يقلل زيادة المنازل العشرية الخطأ في التقريب العددي.</span>
        </p>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase">Precision (الدقة):</span>
          <input 
            type="range" min="0" max="10" value={digits} 
            onChange={(e) => setDigits(Number(e.target.value))}
            className="flex-1 accent-blue-600"
          />
          <span className="text-sm font-mono font-bold text-blue-600">{digits} digits</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">True Value (القيمة الحقيقية)</div>
            <div className="text-lg font-mono text-slate-700 truncate">{trueSqrt2}</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="text-[10px] font-bold text-blue-400 uppercase mb-1">Approximation (التقريب)</div>
            <div className="text-lg font-mono font-bold text-blue-700">{approx}</div>
          </div>
        </div>

        <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex justify-between items-center">
          <span className="text-xs font-bold text-rose-600 uppercase">Current Error (الخطأ الحالي):</span>
          <span className="text-sm font-mono font-bold text-rose-700">{error}</span>
        </div>
      </div>
    </div>
  );
};

const DieSimulator = () => {
  const [val, setVal] = useState(1);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setVal(Math.floor(Math.random() * 6) + 1);
      setRolling(false);
    }, 600);
  };

  const isEven = val % 2 === 0;
  const isDivBy3 = val % 3 === 0;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
          <RefreshCw className={`w-6 h-6 ${rolling ? 'animate-spin' : ''}`} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Example: Die Roll</h3>
          <p className="text-xs text-slate-500">مثال: رمي الزار</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <motion.div 
          animate={rolling ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6 }}
          className="w-24 h-24 bg-white border-4 border-slate-900 rounded-2xl flex items-center justify-center shadow-xl relative"
        >
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-16 h-16">
            {(val === 1 || val === 3 || val === 5) && <div className="col-start-2 row-start-2 w-3 h-3 bg-slate-900 rounded-full" />}
            {(val === 2 || val === 3 || val === 4 || val === 5 || val === 6) && <div className="col-start-1 row-start-1 w-3 h-3 bg-slate-900 rounded-full" />}
            {(val === 2 || val === 3 || val === 4 || val === 5 || val === 6) && <div className="col-start-3 row-start-3 w-3 h-3 bg-slate-900 rounded-full" />}
            {(val === 4 || val === 5 || val === 6) && <div className="col-start-3 row-start-1 w-3 h-3 bg-slate-900 rounded-full" />}
            {(val === 4 || val === 5 || val === 6) && <div className="col-start-1 row-start-3 w-3 h-3 bg-slate-900 rounded-full" />}
            {val === 6 && <div className="col-start-1 row-start-2 w-3 h-3 bg-slate-900 rounded-full" />}
            {val === 6 && <div className="col-start-3 row-start-2 w-3 h-3 bg-slate-900 rounded-full" />}
          </div>
        </motion.div>

        <button 
          onClick={roll} 
          disabled={rolling}
          className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          Roll Die | ارمِ الزار
        </button>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className={`p-4 rounded-2xl border transition-all flex flex-col items-center ${isEven ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
            <span className="text-xs font-bold uppercase">Even (زوجي)</span>
            <span className="text-lg font-black">{isEven ? 'YES' : 'NO'}</span>
          </div>
          <div className={`p-4 rounded-2xl border transition-all flex flex-col items-center ${isDivBy3 ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
            <span className="text-xs font-bold uppercase">Div by 3 (÷ 3)</span>
            <span className="text-lg font-black">{isDivBy3 ? 'YES' : 'NO'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoundingChoppingTool = () => {
  const [val, setVal] = useState(1.234567);
  const [digits, setDigits] = useState(2);

  const rounded = Number(val.toFixed(digits));
  const chopped = Math.floor(val * Math.pow(10, digits)) / Math.pow(10, digits);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Rounding vs. Chopping</h3>
          <p className="text-xs text-slate-500">التقريب مقابل القطع</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Input Number (الرقم): {val}</label>
          <input 
            type="range" min="1" max="10" step="0.000001" value={val} 
            onChange={(e) => setVal(Number(e.target.value))} 
            className="w-full accent-amber-600" 
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase">Digits (المنازل):</span>
          <input 
            type="range" min="0" max="5" value={digits} 
            onChange={(e) => setDigits(Number(e.target.value))}
            className="flex-1 accent-amber-600"
          />
          <span className="text-sm font-mono font-bold text-amber-600">{digits}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
            <div className="text-[10px] font-bold text-blue-400 uppercase mb-1">Rounding (التقريب)</div>
            <div className="text-xl font-mono font-bold text-blue-700">{rounded}</div>
          </div>
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-center">
            <div className="text-[10px] font-bold text-rose-400 uppercase mb-1">Chopping (القطع)</div>
            <div className="text-xl font-mono font-bold text-rose-700">{chopped}</div>
          </div>
        </div>
        
        <p className="text-[10px] text-slate-400 text-center italic">
          Chopping simply removes digits, while Rounding adjusts to the nearest value.
          <br />
          القطع يزيل الأرقام ببساطة، بينما التقريب يعدل لأقرب قيمة.
        </p>
      </div>
    </div>
  );
};

const CoinTossSimulator = () => {
  const [tosses, setTosses] = useState<{ side: 'H' | 'T', id: number }[]>([]);
  const [isTossing, setIsTossing] = useState(false);

  const toss = () => {
    setIsTossing(true);
    setTimeout(() => {
      const side: 'H' | 'T' = Math.random() > 0.5 ? 'H' : 'T';
      setTosses(prev => [{ side, id: Date.now() }, ...prev].slice(0, 10));
      setIsTossing(false);
    }, 600);
  };

  const heads = tosses.filter(t => t.side === 'H').length;
  const tails = tosses.filter(t => t.side === 'T').length;
  const total = tosses.length;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
          <Coins className={`w-6 h-6 ${isTossing ? 'animate-bounce' : ''}`} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Coin Toss Simulator</h3>
          <p className="text-xs text-slate-500">محاكي رمي العملة</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <motion.div 
          animate={isTossing ? { rotateY: [0, 180, 360, 540, 720], y: [0, -50, 0] } : {}}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 bg-yellow-400 border-4 border-yellow-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-2xl font-black text-yellow-800">
            {tosses[0]?.side || '?'}
          </span>
        </motion.div>

        <button 
          onClick={toss} 
          disabled={isTossing}
          className="w-full py-3 bg-yellow-500 text-white rounded-2xl font-bold hover:bg-yellow-600 transition-all disabled:opacity-50 shadow-md"
        >
          Toss Coin | ارمِ العملة
        </button>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Heads (صورة)</div>
            <div className="text-lg font-black text-slate-700">{heads}</div>
            <div className="text-[10px] text-slate-400">{total > 0 ? ((heads/total)*100).toFixed(0) : 0}%</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Tails (كتابة)</div>
            <div className="text-lg font-black text-slate-700">{tails}</div>
            <div className="text-[10px] text-slate-400">{total > 0 ? ((tails/total)*100).toFixed(0) : 0}%</div>
          </div>
        </div>

        <div className="flex gap-2 overflow-hidden w-full justify-center">
          <AnimatePresence>
            {tosses.map((t) => (
              <motion.div
                key={t.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                  t.side === 'H' ? 'bg-yellow-100 border-yellow-300 text-yellow-700' : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                {t.side}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ErrorImpactVisualizer = () => {
  const [magnitude, setMagnitude] = useState(100);
  const error = 5;

  const relError = ((error / magnitude) * 100).toFixed(2);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Relative Error Impact</h3>
          <p className="text-xs text-slate-500">تأثير الخطأ النسبي</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          The same absolute error (5) matters less as the true value increases.
          <br />
          <span className="text-xs text-slate-400">نفس الخطأ المطلق (5) يقل تأثيره كلما زادت القيمة الحقيقية.</span>
        </p>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase">True Value (القيمة): {magnitude}</label>
          <input 
            type="range" min="10" max="1000" step="10" value={magnitude} 
            onChange={(e) => setMagnitude(Number(e.target.value))} 
            className="w-full accent-rose-600" 
          />
        </div>

        <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${Math.min(100, (error / magnitude) * 1000)}%` }}
            className="h-full bg-rose-500"
          />
        </div>

        <div className="flex justify-between items-center p-4 bg-rose-50 rounded-2xl border border-rose-100">
          <div>
            <div className="text-[10px] font-bold text-rose-400 uppercase">Relative Error</div>
            <div className="text-2xl font-black text-rose-700">{relError}%</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-rose-400 uppercase">Absolute Error</div>
            <div className="text-2xl font-black text-rose-700">{error}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrecisionAccuracyLab = () => {
  const [accuracy, setAccuracy] = useState(80); // 0 to 100
  const [precision, setPrecision] = useState(80); // 0 to 100
  
  const points = useMemo(() => {
    const pts = [];
    const centerX = 100;
    const centerY = 100;
    
    // Accuracy offset (how far the cluster is from center)
    const offsetX = (100 - accuracy) * 0.6;
    const offsetY = (100 - accuracy) * 0.3;
    
    // Precision spread (how spread out the points are)
    const spread = (100 - precision) * 0.5;
    
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * spread;
      pts.push({
        x: centerX + offsetX + Math.cos(angle) * dist,
        y: centerY + offsetY + Math.sin(angle) * dist
      });
    }
    return pts;
  }, [accuracy, precision]);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Precision vs Accuracy</h3>
          <p className="text-xs text-slate-500">الدقة مقابل الضبط</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-48 h-48 bg-slate-100 rounded-full border-4 border-slate-200 flex items-center justify-center overflow-hidden">
          {/* Target Rings */}
          <div className="absolute w-40 h-40 border-2 border-slate-200 rounded-full" />
          <div className="absolute w-28 h-28 border-2 border-slate-200 rounded-full" />
          <div className="absolute w-16 h-16 border-2 border-slate-200 rounded-full" />
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          
          {/* Points */}
          <svg width="200" height="200" viewBox="0 0 200 200" className="absolute inset-0">
            {points.map((p, i) => (
              <motion.circle 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ x: p.x, y: p.y, opacity: 1 }}
                r="3"
                fill="#f43f5e"
                className="drop-shadow-sm"
              />
            ))}
          </svg>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>Accuracy (الضبط)</span>
              <span>{accuracy}%</span>
            </div>
            <input type="range" value={accuracy} onChange={(e) => setAccuracy(Number(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>Precision (الدقة)</span>
              <span>{precision}%</span>
            </div>
            <input type="range" value={precision} onChange={(e) => setPrecision(Number(e.target.value))} className="w-full accent-rose-600" />
          </div>
          
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-500 leading-relaxed">
            <strong className="text-slate-700 block mb-1">Numerical Insight:</strong>
            Accuracy is how close a measurement is to the true value. Precision is how consistent the measurements are.
          </div>
        </div>
      </div>
    </div>
  );
};

const AxiomVisualizer = () => {
  const [pa, setPa] = useState(0.4);
  const [pb, setPb] = useState(0.3);
  const [pab, setPab] = useState(0.1);

  // Ensure pab <= min(pa, pb)
  const effectivePab = Math.min(pab, pa, pb);
  const union = pa + pb - effectivePab;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Axiom Explorer</h3>
          <p className="text-xs text-slate-500">مستكشف بديهيات الاحتمالية</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Probability Bar */}
        <div className="relative h-12 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center px-1">
          <div className="absolute inset-0 flex justify-between px-4 pointer-events-none">
            <span className="text-[10px] font-bold text-slate-300 self-center">0</span>
            <span className="text-[10px] font-bold text-slate-300 self-center">0.5</span>
            <span className="text-[10px] font-bold text-slate-300 self-center">1.0</span>
          </div>
          
          {/* Event A */}
          <motion.div 
            animate={{ width: `${pa * 100}%` }}
            className="absolute left-0 h-8 bg-blue-500/30 border-r-2 border-blue-500 z-10"
          />
          
          {/* Event B (from right for visualization) */}
          <motion.div 
            animate={{ width: `${pb * 100}%` }}
            className="absolute right-0 h-8 bg-rose-500/30 border-l-2 border-rose-500 z-10"
          />

          {/* Union Highlight */}
          <motion.div 
            animate={{ width: `${Math.min(100, union * 100)}%` }}
            className="absolute left-0 h-1 bg-indigo-600 bottom-0 z-20"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-blue-500 uppercase">P(A)</label>
            <input type="number" step="0.05" min="0" max="1" value={pa} onChange={(e) => setPa(Number(e.target.value))} className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-rose-500 uppercase">P(B)</label>
            <input type="number" step="0.05" min="0" max="1" value={pb} onChange={(e) => setPb(Number(e.target.value))} className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-purple-500 uppercase">P(A ∩ B)</label>
            <input type="number" step="0.05" min="0" max="1" value={pab} onChange={(e) => setPab(Number(e.target.value))} className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className={`w-2 h-2 rounded-full ${pa >= 0 && pa <= 1 ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-[10px] font-medium text-slate-700">Axiom 1: 0 ≤ P(A) ≤ 1</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className={`w-2 h-2 rounded-full ${union <= 1 ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-[10px] font-medium text-slate-700">Axiom 2: P(S) = 1 (Union ≤ 1)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[10px] font-medium text-slate-700">Axiom 3: P(A ∪ B) = {union.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('intro');

  const content = {
    intro: {
      title: "Cyber-Numeric Hub",
      titleAr: "مركز الأرقام السيبراني",
      desc: "Welcome to the integrated learning platform for Numerical Analysis and Probability, specifically designed for Cybersecurity students.",
      descAr: "مرحباً بكم في المنصة التعليمية المتكاملة للتحليل العددي والاحتمالية، المصممة خصيصاً لطلاب الأمن السيبراني.",
      points: [
        { en: "Interactive Lecture Summaries", ar: "ملخصات محاضرات تفاعلية" },
        { en: "Real-time Numerical Simulators", ar: "محاكيات عددية فورية" },
        { en: "Probability Axiom Solvers", ar: "محللات بديهيات الاحتمالية" },
        { en: "Cybersecurity Applications", ar: "تطبيقات الأمن السيبراني" }
      ]
    },
    lecture1: {
      title: "Lecture 1: Numerical Analysis",
      titleAr: "المحاضرة 1: التحليل العددي",
      markdown: `
### 1.1 Introduction (المقدمة)

Numerical Analysis is considered the bridge that connects complex theoretical mathematics with practical real-world applications, especially in light of current technological advancements.

يعتبر التحليل العددي الجسر الذي يربط الرياضيات النظرية المعقدة بالتطبيقات العملية في العالم الحقيقي، خاصة في ظل التطورات التكنولوجية الحالية.

&nbsp;

### 1.2 What is numerical analysis? (ما هو التحليل العددي؟)

Numerical analysis is a branch of mathematics that focuses on studying algorithms that use simple arithmetic operations (addition, subtraction, multiplication, and division) to obtain approximate solutions to complex mathematical problems that may be difficult — or impossible — to solve using traditional methods (analytical solutions).

التحليل العددي هو فرع من فروع الرياضيات يركز على دراسة الخوارزميات التي تستخدم العمليات الحسابية البسيطة (الجمع، الطرح، الضرب، والقسمة) للحصول على حلول تقريبية للمسائل الرياضية المعقدة التي قد يكون من الصعب - أو المستحيل - حلها باستخدام الطرق التقليدية (الحلول التحليلية).

&nbsp;

Simply put, if traditional mathematics seeks an "ideal" solution like $x = \sqrt{2}$, then numerical analysis seeks a solution that is "accurate enough" for practical applications, such as $x \approx 1.4141$.

ببساطة، إذا كانت الرياضيات التقليدية تبحث عن حل "مثالي" مثل $x = \sqrt{2}$، فإن التحليل العددي يبحث عن حل "دقيق بما يكفي" للتطبيقات العملية، مثل $x \approx 1.4141$.

&nbsp;

### 1.3 Why do we need numerical analysis? (لماذا نحتاج التحليل العددي؟)

Because: (بسبب:)

1. There are differential equations or complex integrals that cannot be solved using pen and paper and direct laws.

هناك معادلات تفاضلية أو تكاملات معقدة لا يمكن حلها باستخدام الورقة والقلم والقوانين المباشرة.

&nbsp;

2. Dealing with computers: Computers, despite their speed, do not understand "infinity" or abstract symbols; they only deal with numbers and logical operations. Numerical analysis translates mathematical problems into a language that the computer understands.

التعامل مع الحواسيب: الحواسيب، رغم سرعتها، لا تفهم "اللانهاية" أو الرموز المجردة؛ فهي تتعامل فقط مع الأرقام والعمليات المنطقية. يقوم التحليل العددي بترجمة المسائل الرياضية إلى لغة يفهمها الحاسوب.

&nbsp;

3. Speed and efficiency: In engineering and physics, we often need quick results to make decisions, and approximate solutions save a tremendous amount of time and effort.

السرعة والكفاءة: في الهندسة والفيزياء، غالباً ما نحتاج إلى نتائج سريعة لاتخاذ القرارات، والحلول التقريبية توفر قدراً هائلاً من الوقت والجهد.

&nbsp;

### 1.4 Three main points (ثلاث نقاط رئيسية)

1. **Algorithm**: A series of defined logical steps to reach the solution.

**الخوارزمية**: سلسلة من الخطوات المنطقية المحددة للوصول إلى الحل.

&nbsp;

2. **Convergence**: The extent to which the solution provided by the algorithm approaches the true solution as the number of steps increases.

**التقارب**: المدى الذي يقترب فيه الحل الذي توفره الخوارزمية من الحل الحقيقي مع زيادة عدد الخطوات.

&nbsp;

3. **Error Analysis**: Since the solution is "approximate," it is essential to measure the extent of the error (whether it results from rounding numbers or the nature of the algorithm itself) to ensure the reliability of the results.

**تحليل الخطأ**: بما أن الحل "تقريبي"، فمن الضروري قياس مدى الخطأ (سواء كان ناتجاً عن تقريب الأرقام أو طبيعة الخوارزمية نفسها) لضمان موثوقية النتائج.

&nbsp;

### 1.5 Applications (التطبيقات)

1. **Artificial Intelligence**: Training neural networks relies entirely on numerical optimization algorithms.

**الذكاء الاصطناعي**: يعتمد تدريب الشبكات العصبية كلياً على خوارزميات التحسين العددي.

&nbsp;

2. **Structural engineering**: Designing bridges and buildings and ensuring their resilience against winds and earthquakes.

**الهندسة الإنشائية**: تصميم الجسور والمباني وضمان صمودها أمام الرياح والزلازل.

&nbsp;

3. **Weather forecasting**: Simulating atmospheric movement and pressure changes.

**التنبؤ بالطقس**: محاكاة حركة الغلاف الجوي وتغيرات الضغط.
      `
    },
    lecture2: {
      title: "Lecture 2: Sample Space & Events",
      titleAr: "المحاضرة 2: فضاء العينة والأحداث",
      markdown: `
### 2.1 Random (statistical) experiment (التجربة العشوائية الإحصائية)

Any experiment whose outcome cannot be predicted with certainty before the experiment is run.

أي تجربة لا يمكن التنبؤ بنتيجتها بيقين قبل إجراء التجربة.

&nbsp;

Like a die, its outcomes are 1 out of 6 possible results, but without certainty of which face it will land on, just like flipping a coin.

مثل الزار، نتائجه هي 1 من أصل 6 نتائج ممكنة، ولكن دون يقين بشأن الوجه الذي سيستقر عليه، تماماً مثل رمي العملة.

&nbsp;

### 2.2 Sample space (S) (فضاء العينة)

Set of all possible outcomes of a random experiment.

مجموعة كل النتائج الممكنة لتجربة عشوائية.

&nbsp;

Each outcome in a sample space is called an element or number of sample space or simply of sample point.

كل نتيجة في فضاء العينة تسمى عنصراً أو عدداً من فضاء العينة أو ببساطة نقطة عينة.

&nbsp;

- **Discrete**: If it consists of a finite or countable infinite set of outcomes. (e.g., {1,2,3,4})

**منفصل**: إذا كان يتكون من مجموعة محدودة أو قابلة للعد من النتائج. (مثل {1,2,3,4})

&nbsp;

- **Continuous**: If it contains an interval (either finite or infinite) of real numbers.

**مستمر**: إذا كان يحتوي على فترة (سواء كانت محدودة أو غير محدودة) من الأرقام الحقيقية.

&nbsp;

### 2.3 Event (E) (الحدث)

A result of none, one, or more outcomes in the sample space; an event is a subset of the sample space.

نتيجة لصفر أو واحد أو أكثر من النتائج في فضاء العينة؛ الحدث هو مجموعة جزئية من فضاء العينة.

&nbsp;

Example: Rolling a die, $E = \{2, 4, 6\}$ (even numbers).

مثال: رمي الزار، $E = \{2, 4, 6\}$ (الأرقام الزوجية).

&nbsp;

### 2.4 Set Operations (عمليات المجموعات)

1. **Union (∪)**: Outcomes contained in either of the two events.

**الاتحاد (∪)**: النتائج الموجودة في أي من الحدثين.

&nbsp;

2. **Intersection (∩)**: Outcomes contained in both of the two events.

**التقاطع (∩)**: النتائج الموجودة في كلا الحدثين.

&nbsp;

3. **Complement (E')**: Outcomes in the sample space that are not in the event.

**المكمل (E')**: النتائج في فضاء العينة التي ليست في الحدث.

&nbsp;

### 2.5 Mutually Exclusive (الأحداث المتنافية)

Two events A and B are mutually exclusive, or disjoint, if $A \cap B = \emptyset$ (no elements in common).

يكون الحدثان A و B متنافيين، أو منفصلين، إذا كان $A \cap B = \emptyset$ (لا توجد عناصر مشتركة).
      `
    },
    lecture3: {
      title: "Lecture 3: Axioms of Probability",
      titleAr: "المحاضرة 3: بديهيات الاحتمالية",
      markdown: `
### Axioms for probability (بديهيات الاحتمالية)

&nbsp;

### 3.1 Non-negativity (عدم السالبية)

$P(A) \ge 0$. The probability of any event is never negative.

احتمالية أي حدث لا تكون سالبة أبداً.

&nbsp;

The event probability is between 0 and 1.

احتمالية الحدث تكون بين 0 و 1.

- 0 → Impossible event (حدث مستحيل).

- 1 → Certain event (حدث مؤكد).

&nbsp;

### 3.2 Total probability (الاحتمالية الكلية)

$P(S) = 1$. The probability of all outcomes together is one.

احتمالية جميع النتائج معاً هي واحد.

&nbsp;

One of them must happen → total = 1.

يجب أن تقع واحدة منها → المجموع = 1.

&nbsp;

### 3.3 Additivity (الجمع)

**For mutually exclusive events (للأحداث المتنافية):**

If event A and B cannot happen together:

إذا كان الحدث A و B لا يمكن أن يقعا معاً:

$P(A \cup B) = P(A) + P(B)$

&nbsp;

**If events do overlap (إذا تداخلت الأحداث):**

$P(A \cup B) = P(A) + P(B) - P(A \cap B)$

We subtract the intersection to avoid counting twice.

نطرح التقاطع لتجنب العد مرتين.

&nbsp;

### 3.4 Note in the questions (ملاحظة في الأسئلة)

- **Or** means Union (∪). (أو تعني اتحاد)

- **And** means Intersection (∩). (و تعني تقاطع)

&nbsp;

Example: Rolling a die once, what is the probability that the outcomes is even AND divisible by 3?

مثال: رمي الزار مرة واحدة، ما هي احتمالية أن تكون النتيجة زوجية وقابلة للقسمة على 3؟

$S = \{1, 2, 3, 4, 5, 6\}$, $A = \{2, 4, 6\}$, $B = \{3, 6\}$

$A \cap B = \{6\} \implies P(A \cap B) = 1/6 \approx 0.16$
      `
    },
    cyber: {
      title: "Cyber Connection",
      titleAr: "الارتباط السيبراني",
      markdown: `
### How this applies to your field:
كيف ينطبق هذا على مجالك:

1. **Risk Assessment**: Calculating the probability of a data breach.
**تقييم المخاطر**: حساب احتمالية حدوث خرق للبيانات.

2. **Cryptography**: Analyzing the probability of cracking an encryption key.
**التشفير**: تحليل احتمالية كسر مفتاح التشفير.

3. **Intrusion Detection**: Using numerical models to detect abnormal network traffic.
**كشف التسلل**: استخدام النماذج العددية للكشف عن حركة مرور الشبكة غير الطبيعية.

4. **Fuzzing**: Generating random inputs to find software bugs.
**الاختبار العشوائي**: توليد مدخلات عشوائية للعثور على أخطاء برمجية.

**Numerical Analysis** ensures these security algorithms run fast and accurately on real hardware.
**التحليل العددي** يضمن تشغيل خوارزميات الأمان هذه بسرعة ودقة على الأجهزة الحقيقية.
      `
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4">
      <Navbar activeSection={activeSection} onSelect={setActiveSection} />
      
      <main className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              {activeSection === 'intro' ? (
                <div className="space-y-8">
                  <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
                    <div className="relative z-10">
                      <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-2 leading-tight">
                        Master <span className="text-blue-600">Numbers</span> & <span className="text-indigo-600">Probability</span>
                      </h1>
                      <h2 className="text-2xl font-bold text-slate-400 mb-6">أتقن الأرقام والاحتمالية</h2>
                      <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-2">
                        {content.intro.desc}
                      </p>
                      <p className="text-sm text-slate-400 mb-8 italic">
                        {content.intro.descAr}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {content.intro.points.map((point, i) => (
                          <div key={i} className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                              {point.en}
                            </div>
                            <span className="text-[10px] text-slate-400 ml-6">{point.ar}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button onClick={() => setActiveSection('lecture1')} className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all text-left group">
                      <Calculator className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold">Numerical</h4>
                      <span className="text-xs text-slate-400">التحليل العددي</span>
                    </button>
                    <button onClick={() => setActiveSection('lecture2')} className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-green-500 hover:shadow-xl transition-all text-left group">
                      <GitBranch className="w-8 h-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold">Sample Space</h4>
                      <span className="text-xs text-slate-400">فضاء العينة</span>
                    </button>
                    <button onClick={() => setActiveSection('lecture3')} className="p-6 bg-white rounded-3xl border border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all text-left group">
                      <Layers className="w-8 h-8 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold">Probability</h4>
                      <span className="text-xs text-slate-400">الاحتمالية</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm">
                  <div className="mb-8">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                      {content[activeSection].title}
                    </h2>
                    <p className="text-xl font-bold text-slate-400 mt-1">{content[activeSection].titleAr}</p>
                  </div>
                  <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-strong:text-slate-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded">
                    <ReactMarkdown>{content[activeSection].markdown || ''}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar / Tools */}
            <div className="lg:col-span-5 space-y-6">
              {activeSection === 'lecture1' && (
                <>
                  <NumericalLab />
                  <PrecisionAccuracyLab />
                  <ErrorVisualizer />
                  <SqrtApproximation />
                  <RoundingChoppingTool />
                  <ErrorImpactVisualizer />
                </>
              )}
              {activeSection === 'lecture3' && (
                <>
                  <AxiomVisualizer />
                  <ProbabilityTool />
                  <VennDiagramTool />
                  <DieSimulator />
                  <CoinTossSimulator />
                </>
              )}
              {activeSection === 'lecture2' && (
                <>
                  <TreeDiagramGenerator />
                  <VennDiagramTool />
                  <DieSimulator />
                  <CoinTossSimulator />
                </>
              )}

              {activeSection === 'intro' && (
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold mb-1">Ready to Start?</h4>
                    <p className="text-xs text-slate-500 mb-4">هل أنت مستعد للبدء؟</p>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                      Dive into the first lecture on Numerical Analysis and see how algorithms shape our digital world.
                    </p>
                    <button 
                      onClick={() => setActiveSection('lecture1')}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                    >
                      Start Learning | ابدأ التعلم
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'cyber' && (
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-2xl">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-bold mb-1">Cyber Mission</h4>
                  <p className="text-xs text-white/60 mb-4">المهمة السيبرانية</p>
                  <p className="opacity-90 leading-relaxed mb-8">
                    "Calculate the probability of a successful brute-force attack on a 4-digit PIN if the attacker has 3 attempts."
                  </p>
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-sm font-mono backdrop-blur-sm">
                    Hint: Use the complement rule.
                    <br />
                    <span className="text-[10px] opacity-60">تلميح: استخدم قاعدة المكمل.</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
