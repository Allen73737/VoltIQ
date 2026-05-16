package com.voltiq.energy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
@EnableScheduling
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		applyRenderDatabaseProperties();
		SpringApplication.run(BackendApplication.class, args);
	}

	private static void applyRenderDatabaseProperties() {
		String databaseUrl = System.getenv("DATABASE_URL");
		if (databaseUrl == null || databaseUrl.isBlank()) {
			return;
		}
		if (!databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("postgres://")) {
			return;
		}

		URI uri = URI.create(databaseUrl);
		String[] userInfo = uri.getUserInfo() == null ? new String[0] : uri.getUserInfo().split(":", 2);
		int port = uri.getPort() == -1 ? 5432 : uri.getPort();
		String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath();
		if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
			jdbcUrl += "?" + uri.getQuery();
		}
		System.setProperty("spring.datasource.url", jdbcUrl);
		System.setProperty("spring.datasource.username", userInfo.length > 0 ? decode(userInfo[0]) : "");
		System.setProperty("spring.datasource.password", userInfo.length > 1 ? decode(userInfo[1]) : "");
	}

	private static String decode(String value) {
		return URLDecoder.decode(value, StandardCharsets.UTF_8);
	}
}
