openapi-types:
	@npx openapi-typescript $(NEXT_PUBLIC_SUPABASE_URL)"/rest/v1/?apikey="$(NEXT_PUBLIC_SUPABASE_ANON_KEY) --output types/supabase.ts
