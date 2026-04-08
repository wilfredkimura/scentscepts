# scentcepts — sprygen fullstack
.PHONY: dev backend frontend

dev:
	@echo "Starting backend and frontend..."
	@make backend &
	@make frontend

backend:
	cd backend && ./mvnw spring-boot:run

frontend:
	cd frontend && npm run dev
