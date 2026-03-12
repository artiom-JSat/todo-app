export function AppPreview() {
  return (
    <section className="border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl max-w-3xl w-full mx-auto">
      <div className="h-10 bg-muted/40 w-full flex items-center px-4 border-b">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
        </div>
      </div>
      <div className="p-6 md:p-10 space-y-4">
        <div className="h-6 w-40 bg-primary/20 rounded-md mb-8" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 border rounded-xl bg-background/50">
            <div className={`h-6 w-6 rounded-md border-2 
              ${i === 1 ? 'border-primary bg-primary/10' : 'border-muted'}`}
            />
            <div className="space-y-2 flex-1 bg">
              <div className={`h-3 ${i === 1 ? 'w-1/2' : 'w-3/4'} bg-muted rounded`} />
              {i === 1 && <div className="h-2 w-1/4 bg-muted/50 rounded" />}
            </div>
            <div className="h-5 w-12 bg-muted rounded-full hidden sm:block" />
          </div>
        ))}
      </div>
    </section>
  )
}
