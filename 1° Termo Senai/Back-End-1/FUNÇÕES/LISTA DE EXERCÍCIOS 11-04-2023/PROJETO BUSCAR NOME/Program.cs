﻿/* 6 - Escreva um algoritmo que permita a leitura dos nomes de 10 pessoas e armazene os nomes
lidos em um vetor. Após isto, o algoritmo deve permitir a leitura de mais 1 nome qualquer de
pessoa (para efetuar uma busca) e depois escrever a mensagem ACHEI, se o nome estiver
entre os 10 nomes lidos anteriormente (guardados no vetor), ou NÃO ACHEI caso contrário. */

string [] ListaNomes = new string[10];

for (int i = 0; i < 10; i++)
{
    Console.WriteLine($"Digite o nome da {i+1}° pessoas: ");
    ListaNomes[i] = Console.ReadLine();
    
    

    
}
