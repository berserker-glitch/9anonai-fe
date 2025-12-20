import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rotate-12 animate-float" />
          <div className="absolute top-40 right-[15%] w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl -rotate-12 animate-float-delayed" />
          <div className="absolute bottom-40 left-[20%] w-12 h-12 bg-gradient-to-br from-primary/25 to-primary/5 rounded-lg rotate-45 animate-float" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span className="text-sm text-primary font-medium">مساعد قانوني ذكي • AI-Powered Legal Assistant</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                مساعدك القانوني
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                المغربي الذكي
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              احصل على إجابات فورية حول القانون المغربي وإجراءاته القانونية وحقوقك.
              <span className="block mt-2 text-base sm:text-lg opacity-80">
                Get instant answers about Moroccan law, legal procedures, and your rights.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                href="/chat"
                className="group w-full sm:w-auto px-10 py-5 text-lg font-medium bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <span>ابدأ المحادثة مجانًا</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto px-10 py-5 text-lg font-medium bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:bg-accent hover:border-primary/30 transition-all duration-300"
              >
                اكتشف المزيد
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              ✓ مجاني تمامًا • ✓ بدون تسجيل • ✓ متاح 24/7
            </p>
          </div>

          {/* Chat Preview - Enhanced */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-[2rem] blur-3xl opacity-50" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl" />

              {/* Chat Window */}
              <div className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
                {/* Browser Bar */}
                <div className="bg-muted/50 px-4 py-3 border-b border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-background/50 rounded-lg text-xs text-muted-foreground">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    9anon.ai/chat
                  </div>
                  <div className="w-20" />
                </div>

                {/* Chat Messages */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* User Message */}
                  <div className="flex justify-end animate-fade-in">
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-5 py-3 rounded-2xl rounded-br-md max-w-sm shadow-lg">
                      <p className="text-right" dir="rtl">ما هي عقوبة السرقة في المغرب؟</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start animate-fade-in-delayed">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-sm">9</span>
                      </div>
                      <div className="bg-muted/80 backdrop-blur-sm px-5 py-3 rounded-2xl rounded-bl-md max-w-md shadow-lg border border-border/30">
                        <p className="text-right leading-relaxed" dir="rtl">
                          حسب القانون الجنائي المغربي (المواد 505-534)، السرقة البسيطة معاقب عليها بالحبس من سنة إلى 5 سنوات. إذا كان هناك كسر أو عنف، تصل العقوبة إلى 10-20 سنة...
                        </p>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          3 مصادر قانونية
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Bar */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="flex items-center gap-3 bg-muted/50 border border-border/30 rounded-xl px-4 py-3">
                    <input
                      type="text"
                      placeholder="اطرح سؤالك القانوني..."
                      className="flex-1 bg-transparent outline-none text-right"
                      dir="rtl"
                      disabled
                    />
                    <button className="p-2 bg-primary text-primary-foreground rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By / Stats Section */}
      <section className="py-12 border-y border-border/30 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "+10,000", label: "مستخدم نشط", labelEn: "Active Users" },
              { value: "+50,000", label: "سؤال مجاب", labelEn: "Questions Answered" },
              { value: "99.9%", label: "دقة الإجابات", labelEn: "Accuracy Rate" },
              { value: "4 لغات", label: "مدعومة", labelEn: "Languages" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              المميزات
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">لماذا تختار 9anon؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              مساعد قانوني متخصص في القانون المغربي بإمكانيات ذكاء اصطناعي متقدمة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
                title: "خبير في القانون المغربي",
                description: "مدرب على آلاف الوثائق القانونية المغربية والمدونات والإجراءات القانونية.",
                gradient: "from-blue-500/20 to-blue-600/5",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                ),
                title: "متعدد اللغات",
                description: "يتحدث العربية والفرنسية والإنجليزية والدارجة بطلاقة.",
                gradient: "from-green-500/20 to-green-600/5",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "إجابات فورية",
                description: "احصل على معلومات قانونية في ثوانٍ وليس أيام.",
                gradient: "from-yellow-500/20 to-yellow-600/5",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "مصادر موثقة",
                description: "كل إجابة مدعومة بمصادر قانونية ومواد قانونية محددة.",
                gradient: "from-purple-500/20 to-purple-600/5",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "آمن وخاص",
                description: "محادثاتك مشفرة ولا تتم مشاركتها مع أي طرف ثالث.",
                gradient: "from-red-500/20 to-red-600/5",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "مجاني للجميع",
                description: "الوصول الأساسي مجاني إلى الأبد. لا بطاقة ائتمان مطلوبة.",
                gradient: "from-pink-500/20 to-pink-600/5",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group relative bg-gradient-to-br ${feature.gradient} border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              كيف يعمل
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">ثلاث خطوات بسيطة</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "اطرح سؤالك", desc: "اكتب سؤالك القانوني بأي لغة تفضلها." },
              { step: "2", title: "الذكاء الاصطناعي يبحث", desc: "نحلل سؤالك ونبحث في آلاف الوثائق القانونية." },
              { step: "3", title: "احصل على إجابتك", desc: "تلقى إجابة دقيقة مع المصادر القانونية الداعمة." },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/30">
                  {item.step}
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            مستعد للحصول على إجابات قانونية؟
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg">
            انضم إلى آلاف المستخدمين الذين يحصلون على إرشادات قانونية فورية حول القانون المغربي.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 px-10 py-5 text-lg font-medium bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-[1.02]"
          >
            <span>ابدأ الآن مجانًا</span>
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-15px) rotate(-12deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite 0.5s; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-fade-in-delayed { animation: fade-in 0.5s ease-out 0.3s forwards; opacity: 0; }
      `}</style>
    </div>
  );
}
